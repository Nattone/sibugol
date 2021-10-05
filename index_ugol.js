const loader = new THREE.GLTFLoader();

// Load a glTF resource
loader.load(
    // resource URL
    './models/SimpleSkinning.gltf',
    // called when the resource is loaded
    function (gltf) {
        console.log('loaded');

        scene.add(gltf.scene);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

    },

    // called while loading is progressing
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function (error) {
        console.log('An error happened');
    }
);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight); // 70 - насколько широко видит камера
const renderer = new THREE.WebGLRenderer();

scene.background = new THREE.Color(0x000fff); // фон для сцены
renderer.setSize(window.innerWidth, window.innerHeight); //установка размера = текущ.ширина и текущ.высота
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement); // в эл-т body вставляем рендер
camera.position.z = 5;
