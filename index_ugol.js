let camera, scene, renderer;

init();
render();

function init() {
    const container = document.getElementById('ugol');

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(400, 200, 0);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    scene.fog = new THREE.Fog(0xa0a0a0, 70, 100);

    // ground
    const geometry = new THREE.PlaneGeometry(500, 500);
    const material = new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false });

    const ground = new THREE.Mesh(geometry, material);
    ground.position.set(0, - 5, 0);
    ground.rotation.x = - Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const grid = new THREE.GridHelper(500, 100, 0x000000, 0x000000);
    grid.position.y = - 5;
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add(grid);

    // lights
    const dirLight1 = new THREE.DirectionalLight(0xffffff);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x002288);
    dirLight2.position.set(- 1, - 1, - 1);
    scene.add(dirLight2);

    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);

    //
    const loader = new THREE.GLTFLoader();
    loader.load('./models/ugol_origin/Project Name.gltf', function (gltf) {
        scene.add(gltf.scene);
    });

    //
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 5;
    controls.maxDistance = 50;

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.listenToKeyEvents(window); // optional

    controls.addEventListener('change', render); // call this only in static scenes (i.e., if there is no animation loop)

    // controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    // controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;
    // controls.enablePan = false;

    controls.minDistance = 100;
    controls.maxDistance = 500;

    controls.maxPolarAngle = Math.PI / 2;


    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

    render();
}

function render() {
    renderer.render(scene, camera);
}