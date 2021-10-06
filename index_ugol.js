let camera, scene, renderer, object;

init();
render();

function init() {
    const container = document.getElementById('ugol');

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20);
    camera.position.set(0, 0, 0.2);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    //
    const loader = new THREE.GLTFLoader();

    loader.load('./models/ugol_origin/Project Name.gltf', function (gltf) {
        // gltf.scene.scale.set(10.0, 10.0, 10.0);
        object = gltf.scene
        scene.add(object);

        // gltf.animations; // Array<THREE.AnimationClip>
        // gltf.scene; // THREE.Group
        // gltf.scenes; // Array<THREE.Group>
        // gltf.cameras; // Array<THREE.Camera>
        // gltf.asset; // Object

        render();
    });

    //
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
    coal.rotation.x += 0.01;
    coal.rotation.y += 0.01;
    render()
}

function render() {
    renderer.render(scene, camera);
}