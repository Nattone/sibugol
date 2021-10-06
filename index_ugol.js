let camera, scene, renderer, object, light;
let animation = function () { };

init();
render();

function init() {
    const container = document.getElementById('coal');

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20);
    camera.position.set(0, 0, 0.2);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const loader = new THREE.GLTFLoader();
    loader.load('./models/ugol_origin/Project Name.gltf', function (gltf) {
        // gltf.scene.scale.set(10.0, 10.0, 10.0);
        object = gltf.scene;
        scene.add(object);
        animation = animX;
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

function animX() {
    object.rotation.x += 0.01;
}

function animY() {
    object.rotation.y += 0.01;
}

function animZ() {
    object.rotation.z += 0.01;
}

function animate() {
    requestAnimationFrame(animate);
    animation();
    render();
}

function render() {
    renderer.render(scene, camera);
}