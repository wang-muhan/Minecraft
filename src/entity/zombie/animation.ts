import * as THREE from 'three'

export const createZombieAnimation = (zombie: THREE.Group, camera: THREE.PerspectiveCamera) => {
    let lastTime = performance.now()
    // head
    let targetHeadRotationY = 0
    let targetHeadRotationZ = 0
    let currentHeadRotationY = 0
    let currentHeadRotationZ = 0
    // body
    let targetBodyRotationY = 0
    let currentBodyRotationY = 0
    // arms
    let armrotationX = Math.PI / 36
    let armrotationY = Math.PI / 36
    let armrotationZ = 0.0
    let armrotationZOffset = Math.PI * 4 / 9
    let armswingSpeedY = 1.5
    let armswingSpeedZ = 1
    // legs
    let legRotationZ = 0
    let legSwingSpeed = 5 
    let legSwingAmplitude = Math.PI / 8
    let walkTransitionDuration = 1
    // state
    let targetRotationY = 0
    let isWalking = false
    let isFacingCamera = false
    let isFacingCameraAble = false
    // time
    let lastWalkingStateChangeTime = lastTime
    let lastRotationStateChangeTime = lastTime
    let nextWalkingStateChangeTime = Math.random() * 10000 + 5000 + lastTime
    let nextRotationStateChangeTime = Math.random() * 5000 + 2000 + lastTime
    let nextFacingCameraChangeTime = Math.random() * 20000 + 10000 + lastTime
    const animate = (stop: boolean) => {
        const currentTime = performance.now()
        lastTime = currentTime
        // change walking state
        if (stop && isWalking) {
            isWalking = false
            targetBodyRotationY = targetRotationY
            lastWalkingStateChangeTime = currentTime
            nextWalkingStateChangeTime = Math.random() * 10000 + 5000 + currentTime
            if (!isFacingCamera) {
                targetHeadRotationY = targetRotationY
                targetHeadRotationZ = 0
            }
        }
        if (currentTime > nextWalkingStateChangeTime) {
            if (isWalking) {
                targetBodyRotationY = targetRotationY
                if (!isFacingCamera) {
                    targetHeadRotationY = targetRotationY
                    targetHeadRotationZ = 0
                }
            } else {
                targetRotationY = Math.random() * 2 * Math.PI
                targetBodyRotationY = targetRotationY
                targetHeadRotationY = targetRotationY
                isFacingCamera = false
            }
            isWalking = !isWalking
            lastWalkingStateChangeTime = currentTime
            nextWalkingStateChangeTime = Math.random() * 10000 + 5000 + currentTime
        }
        // change rotation state
        if (currentTime > nextRotationStateChangeTime) {
            nextRotationStateChangeTime = Math.random() * 5000 + 2000 + currentTime
            if (!isFacingCamera) {
                lastRotationStateChangeTime = currentTime
                if(isWalking) {
                    let rotateAngle = Math.random() * Math.PI / 2 - Math.PI / 4
                    targetRotationY += rotateAngle
                    targetBodyRotationY = targetRotationY
                } else {
                    let rotateAngle = Math.random() * Math.PI - Math.PI / 2
                    targetRotationY += rotateAngle
                    targetHeadRotationY = targetRotationY
                    if (rotateAngle > Math.PI / 3){
                        targetBodyRotationY += rotateAngle - Math.PI / 3
                    }
                    if (rotateAngle < -Math.PI / 3){
                        targetBodyRotationY += rotateAngle + Math.PI / 3
                    }
                    if (Math.random() < 0.5) {
                        targetBodyRotationY += (targetRotationY - targetBodyRotationY) / 4
                    }
                }
            }
        }
        // check facing camera aviablity
        const center: THREE.Vector3 = zombie.position.clone().add(zombie.children[0].position)
        const cameraDirection = camera.position.clone().sub(center).normalize()
        const cameraEntityDistance = camera.position.distanceTo(center)
        const cameraDirectionXZ = new THREE.Vector3(cameraDirection.x, 0, cameraDirection.z).normalize()
        const entityDirection = new THREE.Vector3(Math.cos(targetRotationY), 0, -Math.sin(targetRotationY))
        if (cameraDirectionXZ.dot(entityDirection) > 0.5 && cameraEntityDistance < 10) {
            isFacingCameraAble = true
        } else {
            if (isFacingCamera) {
                isFacingCamera = false
                targetHeadRotationY = targetRotationY
                targetHeadRotationZ = 0
            }
            isFacingCameraAble = false
        }

        // change facing camera state
        if (currentTime > nextFacingCameraChangeTime) {
            if (isFacingCameraAble) {
                if (isFacingCamera) {
                    isFacingCamera = false
                    targetHeadRotationY = targetRotationY
                    targetHeadRotationZ = 0
                    nextFacingCameraChangeTime = Math.random() * 20000 + 10000 + currentTime
                } else {
                    isFacingCamera = true
                    targetHeadRotationY = Math.atan2(cameraDirection.z, -cameraDirection.x) + Math.PI 
                    while (Math.abs(targetHeadRotationY - targetRotationY) > Math.PI ) {
                        if (targetHeadRotationY > targetRotationY) {
                            targetHeadRotationY -= Math.PI * 2
                        } else {
                            targetHeadRotationY += Math.PI * 2
                        }
                    }
                    targetHeadRotationZ = Math.asin(cameraDirection.y)
                    targetHeadRotationZ = Math.max(-Math.PI / 18, Math.min(Math.PI / 9, targetHeadRotationZ))
                    nextFacingCameraChangeTime = Math.random() * 10000 + 50000 + currentTime
                }
            } else {
                nextFacingCameraChangeTime = Math.random() * 20000 + 10000 + currentTime
            }
        }
        // delayed rotation
        if (!isFacingCamera) {
            if (isWalking && currentTime - lastRotationStateChangeTime > 500){
                targetHeadRotationY = targetRotationY
            }
            if (!isWalking && currentTime - lastRotationStateChangeTime > 1500){
                targetBodyRotationY = targetRotationY
            }
        }

        // perform arm swing
        armrotationY = Math.sin((currentTime - lastWalkingStateChangeTime) / 1000 * armswingSpeedY) * Math.PI / 36 + Math.PI / 36
        armrotationZ = Math.sin((currentTime - lastWalkingStateChangeTime) / 1000 * armswingSpeedZ) * Math.PI / 72
        const left_euler = new THREE.Euler(-armrotationX, -armrotationY, armrotationZ + armrotationZOffset, 'ZXY');
        const right_euler = new THREE.Euler(armrotationX, armrotationY, -armrotationZ + armrotationZOffset, 'ZXY');
        zombie.children[2].setRotationFromEuler(left_euler)
        zombie.children[3].setRotationFromEuler(right_euler)
        zombie.children[2].position.x = Math.sin(armrotationZ + armrotationZOffset) * 0.25
        zombie.children[3].position.x = Math.sin(-armrotationZ + armrotationZOffset) * 0.25
        zombie.children[2].position.y = 1.375 - Math.cos(armrotationZ + armrotationZOffset) * 0.25
        zombie.children[3].position.y = 1.375 - Math.cos(-armrotationZ + armrotationZOffset) * 0.25
        zombie.children[2].position.z = -0.375 + Math.sin(armrotationX) * 0.25
        zombie.children[3].position.z = 0.375 - Math.sin(armrotationX) * 0.25

        // perform walking
        if (isWalking) {
            legRotationZ = Math.sin((currentTime - lastWalkingStateChangeTime) / 1000 * legSwingSpeed) * legSwingAmplitude
        } else {
            if (currentTime - lastWalkingStateChangeTime < walkTransitionDuration * 1000) {
                const progress = (currentTime - lastWalkingStateChangeTime) / (walkTransitionDuration * 1000)
                legRotationZ = THREE.MathUtils.lerp(legRotationZ, 0, progress)
            } else {
                legRotationZ = 0
            }
        }

        zombie.children[4].rotation.z = legRotationZ
        zombie.children[5].rotation.z = -legRotationZ
        zombie.children[4].position.x = Math.sin(legRotationZ) * 0.375
        zombie.children[5].position.x = Math.sin(-legRotationZ) * 0.375
        zombie.children[4].position.y = 0.75 - Math.cos(legRotationZ) * 0.375
        zombie.children[5].position.y = 0.75 - Math.cos(-legRotationZ) * 0.375

        // perform rotation
        currentHeadRotationY = THREE.MathUtils.lerp(currentHeadRotationY, targetHeadRotationY, 0.1)
        currentHeadRotationZ = THREE.MathUtils.lerp(currentHeadRotationZ, targetHeadRotationZ, 0.1)
        currentBodyRotationY = THREE.MathUtils.lerp(currentBodyRotationY, targetBodyRotationY, 0.1)
        zombie.children[0].rotation.y = currentHeadRotationY - currentBodyRotationY
        zombie.children[0].rotation.z = currentHeadRotationZ
        zombie.children[0].position.x = -Math.sin(currentHeadRotationZ) * 0.25 * Math.cos(currentHeadRotationY - currentBodyRotationY)
        zombie.children[0].position.z = Math.sin(currentHeadRotationZ) * 0.25 * Math.sin(currentHeadRotationY - currentBodyRotationY)
        zombie.children[0].position.y = 1.5 + 0.25 * Math.cos(currentHeadRotationZ)
        zombie.rotation.y = currentBodyRotationY
        return isWalking
    }
    return animate
}
