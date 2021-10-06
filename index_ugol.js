let camera, scene, renderer, group, coal, light;
let animation;

let direction = {
    x: true,
    y: true,
    z: true,
}

let deltaSpeed = 0.005;
let defaultSpeed = {
    x: 0.01,
    y: 0.01,
    z: 0.01,
}
let speed = {
    x: 0.01,
    y: 0.01,
    z: 0.01,
}

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
    },
    float: () => {
        group.rotation.x += speed.x;
        if (speed.y > defaultSpeed.y) {
            speed.y -= deltaSpeed;
        } else if (speed.y < defaultSpeed.y) {
            speed.y = defaultSpeed.y;
        }
        group.rotation.y += speed.y;
        group.rotation.z += speed.z;
    },
}

init();
render();

function init() {
    const container = document.getElementById('coal');

    camera = new THREE.PerspectiveCamera(5, 300 / 300, 0.1, 20);
    camera.position.set(0, 0, 0.2);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x00ffffff);

    group = new THREE.Group();
    scene.add(group);

    const loader = new THREE.GLTFLoader();
    loader.load('./models/ugol_origin/Project Name.gltf', function (gltf) {
        coal = gltf.scene;
        coal.position.set(0.003, -0.006, 0);

        group.add(coal);

        animation = animations.float;
        animate();
    });

    light = new THREE.PointLight(0x404040, 8, 100);
    light.position.set(-0.2, -0.1, 0.1);
    scene.add(light);

    renderer = new THREE.WebGLRenderer();
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.physicallyCorrectLights = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(300, 300);
    container.appendChild(renderer.domElement);

    document.addEventListener('click', onClickHandler);
    window.addEventListener('wheel', throttle(onScrollHandler, 200));
    // window.addEventListener('resize', onWindowResize);
}

function onClickHandler() {
    speed.y = 0.3;
}

function onScrollHandler(e) {
    console.log(e);
    speed.y = 0.3;
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