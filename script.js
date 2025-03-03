// // Set up basic scene
// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);

// // Set background color to white
// renderer.setClearColor(0x10171C, 1); // Set background to blue

// document.body.appendChild(renderer.domElement);

// // Add Orbit Controls
// var controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;
// controls.screenSpacePanning = false;

// // Set up lighting: Add both Ambient Light and Directional Light
// var ambientLight = new THREE.AmbientLight(0x404040, 1); // Low-intensity ambient light to brighten the scene slightly
// scene.add(ambientLight);

// var directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Strong light to highlight the 3D model
// directionalLight.position.set(5, 5, 5).normalize(); // Set light position to ensure the model is well-lit
// scene.add(directionalLight);

// // Optional: Add a point light to enhance the model's visibility
// var pointLight = new THREE.PointLight(0xffffff, 1, 100); // White point light
// pointLight.position.set(2, 2, 2); // Position the light in the scene
// scene.add(pointLight);

// // Load 3D model (GLB format)
// var loader = new THREE.GLTFLoader();
// loader.load('result.gltf', function (gltf) {
//     scene.add(gltf.scene);
//     gltf.scene.scale.set(1, 1, 1); // Scale model
//     gltf.scene.position.set(0, 0, 0); // Position model

//     // Ensure the model's material retains its original colors
//     gltf.scene.traverse(function (child) {
//         if (child.isMesh) {
//             child.material.emissive.set(0x000000); // Disable emissive if set
//             child.material.needsUpdate = true; // Update material if needed
//         }
//     });
// }, undefined, function (error) {
//     console.error(error);
// });

// // Set the camera to a better angle for viewing
// camera.position.set(100, 180, 200); // Position the camera at a better angle
// camera.lookAt(0, 0, 0); // Make the camera look at the model's center

// // Animation loop
// var animate = function () {
//     requestAnimationFrame(animate);
//     controls.update(); // Update controls
//     renderer.render(scene, camera);
// };
// animate();

// Set up basic scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true }); // Enable antialiasing for smoother edges
renderer.setSize(window.innerWidth, window.innerHeight);

// Set background color to a dark neutral tone
renderer.setClearColor(0x10171C, 1); // Background remains dark to emphasize the model
document.body.appendChild(renderer.domElement);

// Add Orbit Controls for better navigation
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;

// Add Ambient and Directional Lighting with white tones
var ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // Bright white ambient light
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Strong directional white light
directionalLight.position.set(10, 15, 10); // Positioned above and slightly angled
directionalLight.castShadow = true; // Enable shadows for depth
scene.add(directionalLight);

// Add a white spotlight for dramatic effect
var spotLight = new THREE.SpotLight(0xffffff, 1.2);
spotLight.position.set(15, 20, 15); // Position above and to the side
spotLight.castShadow = true; // Enable shadows
scene.add(spotLight);

// Add a white point light for soft highlights
var pointLight = new THREE.PointLight(0xffffff, 0.8, 100);
pointLight.position.set(5, 5, 5); // Position near the model for highlights
scene.add(pointLight);

// Load 3D model (GLB format)
var loader = new THREE.GLTFLoader();
loader.load('result.gltf', function (gltf) {
    var model = gltf.scene;
    scene.add(model);

    // Scale and position the model
    model.scale.set(1, 1, 1); // Adjust size if necessary
    model.position.set(0, 0, 0); // Center the model

    // Ensure the model's material looks polished
    model.traverse(function (child) {
        if (child.isMesh) {
            child.material.metalness = 0.5; // Add moderate reflectivity
            child.material.roughness = 0.3; // Smoothen the surface slightly
            child.material.emissive.set(0x000000); // Disable glow effects
            child.material.needsUpdate = true; // Apply changes to material
        }
    });
}, undefined, function (error) {
    console.error(error);
});

// Position the camera for a better view
camera.position.set(5, 5, 10); // Adjust position to focus on the model
camera.lookAt(0, 0, 0); // Ensure the camera looks at the model's center

// Resize renderer on window resize
window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Animation loop
var animate = function () {
    requestAnimationFrame(animate);
    controls.update(); // Update OrbitControls
    renderer.render(scene, camera);
};
animate();

