function Coal() {
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.object = null;
    this.light = null;
    this.animation = function () { };

    function init() {
        const container = document.getElementById('coal');

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20);
        this.camera.position.set(0, 0, 0.2);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);

        // load model
        const loader = new THREE.GLTFLoader();
        loader.load('./models/ugol_origin/Project Name.gltf', function (gltf) {
            // gltf.scene.scale.set(10.0, 10.0, 10.0);
            this.object = gltf.scene;
            this.scene.add(object);
            this.animation = animX;
            animate();
        });

        this.light = new THREE.PointLight(0x404040, 8, 100);
        this.light.position.set(-0.2, -0.1, 0.1);
        this.scene.add(light);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.physicallyCorrectLights = true;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);

        window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        render();
    }

    function animate() {
        this.requestAnimationFrame(animate);
        this.animation();
        render();
    }

    function render() {
        this.renderer.render(scene, camera);
    }

    this.animations = {
        animX: function () {
            this.object.rotation.x += 0.01;
        },
        animY: function () {
            this.object.rotation.y += 0.01;
        },
        animZ: function () {
            this.object.rotation.z += 0.01;
        }
    }

    init();
}