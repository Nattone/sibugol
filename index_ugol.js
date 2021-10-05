let camera, scene, renderer;

init();
render();

function init() {
    const container = document.getElementById('ugol');

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 400);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);

    //
    const loader = new THREE.GLTFLoader();
    loader.load('./models/ugol_origin/Project Name.gltf', function (gltf) {
        scene.add(gltf.scene);
    });

    //
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.minDistance = 5;
    controls.maxDistance = 50;
}

function render() {
    renderer.render(scene, camera);
}