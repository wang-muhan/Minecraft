import * as THREE from 'three';
import {Water} from "three/examples/jsm/objects/Water";

// Colors
const black = new THREE.Color('black');
const white = new THREE.Color('white');

function loadFile(filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const loader = new THREE.FileLoader();
        loader.setResponseType('text');
        loader.load(
            filename,
            (data) => resolve(data as string),
            undefined,
            (error) => reject(error)
        );
    });
}


export default class WaterSimulation {
    private _renderer: THREE.WebGLRenderer;
    private _camera: THREE.OrthographicCamera;
    private _viewer: THREE.PerspectiveCamera;
    _geometry: THREE.PlaneGeometry;
    private _rendertargetA: THREE.WebGLRenderTarget;
    private _rendertargetB: THREE.WebGLRenderTarget;
    public rendertarget: THREE.WebGLRenderTarget;
    public rendertargetoutput: THREE.WebGLRenderTarget;
    private _dropMesh!: THREE.Mesh<THREE.PlaneGeometry, THREE.RawShaderMaterial>;
    private _normalMesh!: THREE.Mesh<THREE.PlaneGeometry, THREE.RawShaderMaterial>;
    private _updateMesh!: THREE.Mesh<THREE.PlaneGeometry, THREE.RawShaderMaterial>;
    private _outputMesh!: THREE.Mesh<THREE.PlaneGeometry, THREE.RawShaderMaterial>;
    private raycaster = new THREE.Raycaster();

    private _texture_resolution: number;
    private _water: Water;
    private _mesh: THREE.Mesh;

    public loaded: Promise<void>;

    constructor() {
        this._camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0, 2000);
        this._geometry = new THREE.PlaneGeometry(2, 2);
        this._texture_resolution = 1024;
        this._rendertargetA = new THREE.WebGLRenderTarget(this._texture_resolution, this._texture_resolution, {type: THREE.FloatType});
        this._rendertargetB = new THREE.WebGLRenderTarget(this._texture_resolution, this._texture_resolution, {type: THREE.FloatType});
        this.rendertarget = this._rendertargetA;

        const shadersPromises = [
            loadFile('src/terrain/simulation/shaders/vertex.glsl'),
            loadFile('src/terrain/simulation/shaders/drop_fragment.glsl'),
            loadFile('src/terrain/simulation/shaders/normal_fragment.glsl'),
            loadFile('src/terrain/simulation/shaders/update_fragment.glsl'),
            loadFile('src/terrain/simulation/shaders/output_fragment.glsl'),
        ];

        this.loaded = Promise.all(shadersPromises).then(([vertexShader, dropFragmentShader, normalFragmentShader, updateFragmentShader, outputFragmentShader]) => {
            const dropMaterial = new THREE.RawShaderMaterial({
                uniforms: {
                    center: {value: [0, 0]},
                    radius: {value: 0},
                    strength: {value: 0},
                    texture: {value: null},
                },
                vertexShader: vertexShader,
                fragmentShader: dropFragmentShader,
            });

            const normalMaterial = new THREE.RawShaderMaterial({
                uniforms: {
                    delta: {value: [1 / 256, 1 / 256]},
                    texture: {value: null},
                },
                vertexShader: vertexShader,
                fragmentShader: normalFragmentShader,
            });

            const updateMaterial = new THREE.RawShaderMaterial({
                uniforms: {
                    delta: {value: [1 / 256, 1 / 256]},
                    texture: {value: null},
                },
                vertexShader: vertexShader,
                fragmentShader: updateFragmentShader,
            });

            const outputMaterial = new THREE.RawShaderMaterial({
                uniforms: {
                    texture: {value: null},
                },
                vertexShader: vertexShader,
                fragmentShader: outputFragmentShader,
            });

            this._dropMesh = new THREE.Mesh(this._geometry, dropMaterial);
            this._normalMesh = new THREE.Mesh(this._geometry, normalMaterial);
            this._updateMesh = new THREE.Mesh(this._geometry, updateMaterial);
            this._outputMesh = new THREE.Mesh(this._geometry, outputMaterial);
        });
    }

    setRenderer(renderer: THREE.WebGLRenderer){
        this._renderer = renderer
    }

    setWater(water: Water){
        this._water = water
    }

    setViewer(viewer: THREE.PerspectiveCamera){
        this._viewer = viewer
    }
    setMesh(mesh: THREE.Mesh){
        this._mesh = mesh
    }

    addDrop(x: number, y: number, radius: number, strength: number): void {
        (this._dropMesh.material.uniforms)['center'].value = [x, y];
        (this._dropMesh.material.uniforms as any)['radius'].value = radius;
        (this._dropMesh.material.uniforms as any)['strength'].value = strength;

        this._render(this._dropMesh);
    }

    stepSimulation(): void {
        this._render(this._updateMesh);
    }

    updateNormals(): void {
        this._render(this._normalMesh);
    }

    output(): void {
        const oldrendertarget = this.rendertarget;
        const newrendertarget = this.rendertarget === this._rendertargetA ? this._rendertargetB : this._rendertargetA;
        (this._outputMesh.material as THREE.RawShaderMaterial).uniforms['texture'].value = oldrendertarget.texture;
        this._renderer.setRenderTarget(newrendertarget);
        this._renderer.render(this._outputMesh, this._camera);
        this.rendertargetoutput = newrendertarget
    }

    private _render(mesh: THREE.Mesh): void {
        const oldrendertarget = this.rendertarget;
        const newrendertarget = this.rendertarget === this._rendertargetA ? this._rendertargetB : this._rendertargetA;
        (mesh.material as THREE.RawShaderMaterial).uniforms['texture'].value = oldrendertarget.texture;
        this._renderer.setRenderTarget(newrendertarget);
        this._renderer.render(mesh, this._camera);
        this.rendertarget = newrendertarget;
    }

    update(): void {
        this.stepSimulation();
        this.updateNormals();
        this.output();

        const normalTexture = this.rendertargetoutput.texture;

        normalTexture.wrapS = THREE.RepeatWrapping;
        normalTexture.wrapT = THREE.RepeatWrapping;

        this._renderer.setRenderTarget(null);

        normalTexture.needsUpdate = true;

        const array = new Float32Array(4 * this._texture_resolution * this._texture_resolution);
        this._renderer.readRenderTargetPixels(this.rendertargetoutput, 0, 0, this._texture_resolution, this._texture_resolution, array);


        // saveRenderTargetAsImage(this.rendertargetoutput)

        this._water.material.uniforms['normalSampler'].value = normalTexture;
        this._water.material.needsUpdate = true;

        // set the meshs texture to the output texture
        (this._mesh.material as THREE.MeshStandardMaterial).map = this.rendertargetoutput.texture;
        this._mesh.material.needsUpdate = true;
    }

    onMouseMove(event: MouseEvent): void {
        const canvas = this._renderer.domElement;
        const rect = canvas.getBoundingClientRect();
        const width = canvas.width
        const height = canvas.height
        const mouse = new THREE.Vector2();
        mouse.x = ((event.clientX - rect.left) * 2) / width - 1;
        mouse.y = -((event.clientY - rect.top) * 2) / height + 1;

        this.raycaster.setFromCamera(mouse, this._viewer);
        const intersects = this.raycaster.intersectObject(this._water);

        for (const intersect of intersects) {
            waterSimulation.addDrop(intersect.point.x, intersect.point.z, 0.03, 0.04);
        }
    }

}

const waterSimulation = new WaterSimulation();

function saveRenderTargetAsImage(renderTarget: THREE.WebGLRenderTarget): void {
    // 获取 WebGL 渲染器
    const renderer = new THREE.WebGLRenderer();

    // 创建一个 Canvas 元素
    const canvas = document.createElement('canvas');
    canvas.width = renderTarget.width;
    canvas.height = renderTarget.height;

    // 从 WebGLRenderTarget 中读取像素数据
    const pixels = new Uint8Array(renderTarget.width * renderTarget.height * 4);
    renderer.readRenderTargetPixels(renderTarget, 0, 0, renderTarget.width, renderTarget.height, pixels);

    // 创建 2D 上下文
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(renderTarget.width, renderTarget.height);

    // 将像素数据填充到 ImageData
    for (let i = 0; i < pixels.length; i++) {
        imageData.data[i] = pixels[i];
    }

    // 绘制到 Canvas
    ctx.putImageData(imageData, 0, 0);

    // 转换为 Data URL 并保存
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'render_target_texture.png';
    link.href = dataURL;
    link.click();
}
