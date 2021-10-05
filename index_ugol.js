let mixer, camera, scene, renderer, clock;

init();
animate();

function init() {

    const container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(18, 6, 18);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    scene.fog = new THREE.Fog(0xa0a0a0, 70, 100);

    clock = new THREE.Clock();

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

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemiLight.position.set(0, 200, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(0, 20, 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 18;
    dirLight.shadow.camera.bottom = - 10;
    dirLight.shadow.camera.left = - 12;
    dirLight.shadow.camera.right = 12;
    scene.add(dirLight);

    //

    const loader = new THREE.GLTFLoader();
    loader.load('./models/SimpleSkinning.gltf', function (gltf) {

        scene.add(gltf.scene);

        gltf.scene.traverse(function (child) {

            if (child.isSkinnedMesh) child.castShadow = true;

        });

        mixer = new THREE.AnimationMixer(gltf.scene);
        mixer.clipAction(gltf.animations[0]).play();

    });

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    //

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.minDistance = 5;
    controls.maxDistance = 50;

}

function animate() {

    requestAnimationFrame(animate);

    if (mixer) mixer.update(clock.getDelta());

    render();

}

function render() {

    renderer.render(scene, camera);

}