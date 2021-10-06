let camera, scene, renderer, group, coal, light;
let animation;

const animations = {
    rotate: () => {
        group.rotation.x += 0.01;
        group.rotation.y += 0.01;
        group.rotation.z += 0.01;
    },
    rotateX: () => {
        group.rotation.x += 0.01;
    },
    rotateY: () => {
        group.rotation.y += 0.01;
    },
    rotateZ: () => {
        group.rotation.z += 0.01;
    }
}

init();
render();

function init() {
    const container = document.getElementById('coal');

    camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight, 0.1, 20);
    camera.position.set(0, 0.006, 0.2);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    group = new THREE.Group();
    scene.add(group);

    const loader = new THREE.GLTFLoader();
    loader.load('./models/ugol_origin/Project Name.gltf', function (gltf) {
        coal = gltf.scene;
        group.add(coal);

        coal.position = { x: 0.003, y: -0.006, z: 0 };

        animation = animations.rotate;
        animate();
    });

    light = new THREE.PointLight(0x404040, 8, 100);
    light.position.set(-0.2, -0.1, 0.1);
    scene.add(light);

    renderer = new THREE.WebGLRenderer();
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.physicallyCorrectLights = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
}

function animate() {
    requestAnimationFrame(animate);
    if (typeof animation == 'function') {
        animation();
    }
    render();
}

function render() {
    renderer.render(scene, camera);
}