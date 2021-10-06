//camera
//scene - сцена
//render
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight); // 70 - насколько широко видит камера
const renderer = new THREE.WebGLRenderer();

scene.background = new THREE.Color(0x000fff); // фон для сцены
renderer.setSize(window.innerWidth, window.innerHeight); //установка размера = текущ.ширина и текущ.высота
document.body.appendChild(renderer.domElement); // в эл-т body вставляем рендер
camera.position.z = 5;

const points = [ // массив точек. вектор идёт из точки 0;0 в точку 1;1
    new THREE.Vector2(0, 0),
    new THREE.Vector2(1, 1),
    new THREE.Vector2(5, 4),
]

// линия
const material = new THREE.LineBasicMaterial({ Color: 0x00ff00 }); // материал
const geometry = new THREE.BufferGeometry().setFromPoints(points); //геометрия линии. функция, у неё вызываем установку точек- передаём набор точек в ().
const line = new THREE.Line(geometry, material);
scene.add(line);

// куб
const cubeMaterial = new THREE.MeshBasicMaterial({ Color: 0x555666, envMap: [] });
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // передаём размеры куба 
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

function animate() { //функция, ктр постоянно обновляет сцену (фреймы), показывает, что на ней нарисовали
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    cube.rotation.x += 0.015;
    cube.rotation.y += 0.018;

}

animate(); // вызов ф-ции