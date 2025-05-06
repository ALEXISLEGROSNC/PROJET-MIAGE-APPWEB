class CoffeeScene {
    
    constructor(engine, canvas) {
        if (!engine) {
            throw new Error("Engine is not defined");
        }
        this.scene = new BABYLON.Scene(engine);
        this.engine = engine;
        this.canvas = canvas;

        this.player1 = null;
        this.player2 = null;
        this.mug = null;

        this.winner = null;
        
    }

    async initHavok(){
        this.havokInstance = await HavokPhysics();
        this.havokPlugin = new BABYLON.HavokPlugin(true, this.havokInstance);
        this.scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), this.havokPlugin);
    }
    async init() {
        await this.initHavok();
        this.createScene();
    }
    createScene() {
        
        // scene
        this.scene.clearColor = new BABYLON.Color3.FromHexString("#e2b0ad"); // black background   
        BABYLON.Mesh.CreateGround("ground", 10, 10, 1, this.scene);

        // Lights
        let hemisphericLight = new BABYLON.HemisphericLight(
            "hemisphericLight",
            new BABYLON.Vector3(0, 1, 0),
            this.scene
        );
        hemisphericLight.intensity = 0.5;
        hemisphericLight.diffuse = new BABYLON.Color3(1, 1, 1);
        hemisphericLight.specular = new BABYLON.Color3(0, 0, 0);
        hemisphericLight.groundColor = new BABYLON.Color3(0.3, 0.1, 0);
        
        let directionalLight = new BABYLON.DirectionalLight(
            "directionalLight",
            new BABYLON.Vector3(10, -4, 10),
            this.scene
        );
        directionalLight.intensity = 1;
        directionalLight.diffuse = new BABYLON.Color3(1, 1, 1);
        directionalLight.specular = new BABYLON.Color3(0, 0, 0);
        
        // Shadows
        let shadowGenerator = new BABYLON.ShadowGenerator(1024, directionalLight);
        shadowGenerator.useBlurExponentialShadowMap = true;
        shadowGenerator.blurKernel = 32;
        shadowGenerator.setDarkness(0.7);



        // Materials
        let groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this.scene);
        groundMaterial.diffuseColor = new BABYLON.Color3(0.67, 0.5, 0.3);
        
        let coffeeMaterial = new BABYLON.StandardMaterial("coffeeMaterial", this.scene);
        coffeeMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.1, 0);
        coffeeMaterial.alpha = 0.95;

        let mugMaterial = new BABYLON.StandardMaterial("mugMaterial", this.scene);
        mugMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);

        let ground = BABYLON.Mesh.CreateGround("ground", 10, 10, 1, this.scene);
        ground.material = groundMaterial;



        // MUG
        let mugPosition = new BABYLON.Vector3(0, 0, -1);
        let mugRotation = new BABYLON.Vector3(0, (Math.PI*4.6) / 4, 0);
        BABYLON.SceneLoader.ImportMesh(
            "",
            Main.getAssetsDir() + "lowpolymug/",
            "lowpolymug.glb",
            this.scene,
            (meshes, particleSystems, skeletons, animationGroups) => {
                this.mug = meshes[0];
                this.mug.position = mugPosition;
                this.mug.rotation = mugRotation;
                meshes[1].material = mugMaterial;
                shadowGenerator.addShadowCaster(this.mug);
                const mugAggregate = new BABYLON.PhysicsAggregate(
                    meshes[1],
                    BABYLON.PhysicsShapeType.MESH,
                    { mass: 0, restitution: 0.3 },
                    this.scene
                );
                ground.receiveShadows = true;
            }
        );

        // COFFEE
        this.cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", {
            diameter: 1.2,
            height: 1.2,
            tessellation: 15
        }, this.scene);
        this.cylinder.position = new BABYLON.Vector3(mugPosition.x, mugPosition.y+0.6+0.1, mugPosition.z);
        this.cylinder.material = coffeeMaterial;
        const coffeeAggregate = new BABYLON.PhysicsAggregate(
            this.cylinder,
            BABYLON.PhysicsShapeType.CYLINDER,
            { mass: 0, restitution: 0.1 },
            this.scene
        );
        
        ground.receiveShadows = true;
        
        // camera
        let cameraPosition = new BABYLON.Vector3(0, 30, -50);
        let cameraTarget = new BABYLON.Vector3(mugPosition.x, mugPosition.y+1, mugPosition.z);
        this.camera = new BABYLON.FollowCamera("camera", cameraPosition, this.scene);
        this.camera.setTarget(cameraTarget);
        this.camera.fov = 0.05;

        // let camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 3, -5), this.scene);      
        // camera.attachControl(this.canvas, true);

        // players
        let sukrHeight = 1.3;
        let spawnPoint1 = new BABYLON.Vector3(mugPosition.x-0.4, mugPosition.y + sukrHeight, mugPosition.z);
        let spawnPoint2 = new BABYLON.Vector3(mugPosition.x+0.4, mugPosition.y + sukrHeight, mugPosition.z);
        
        let playerSize = 0.2;

        let player1 = BABYLON.MeshBuilder.CreateBox("player1", {
            size: playerSize
        }, this.scene);
        player1.position = spawnPoint1;
        let player1Material = new BABYLON.StandardMaterial("player1Material", this.scene);
        player1Material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        player1.material = player1Material;

        let player2 = BABYLON.MeshBuilder.CreateBox("player2", {
            size: playerSize
        }, this.scene);
        player2.position = spawnPoint2;
        let player2Material = new BABYLON.StandardMaterial("player2Material", this.scene);
        player2Material.diffuseColor = new BABYLON.Color3(0.5, 0.3, 0.1);
        player2.material = player2Material;
        
        this.setupPlayers(player1, player2,ground);
    }

    setupPlayers(player1,player2,ground) {

        const player1Aggregate = new BABYLON.PhysicsAggregate(
            player1,
            BABYLON.PhysicsShapeType.BOX,
            { mass: 1, restitution: 1 },
            this.scene
        );

        const player2Aggregate = new BABYLON.PhysicsAggregate(
            player2,
            BABYLON.PhysicsShapeType.BOX,
            { mass: 1, restitution: 1 },
            this.scene
        );

        // Continuous force application
        const activeKeys = new Set();

        const applyForce = () => {
            if (activeKeys.has("z")) {
                player1Aggregate.body.applyForce(
                    new BABYLON.Vector3(0, 0, 5),
                    player1.getAbsolutePosition()
                );
            }
            if (activeKeys.has("s")) {
                player1Aggregate.body.applyForce(
                    new BABYLON.Vector3(0, 0, -5),
                    player1.getAbsolutePosition()
                );
            }
            if (activeKeys.has("q")) {
                player1Aggregate.body.applyForce(
                    new BABYLON.Vector3(-5, 0, 0),
                    player1.getAbsolutePosition()
                );
            }
            if (activeKeys.has("d")) {
                player1Aggregate.body.applyForce(
                    new BABYLON.Vector3(5, 0, 0),
                    player1.getAbsolutePosition()
                );
            }
        };

        // Start applying forces
        this.INPUTHANDLER.z.down = () => activeKeys.add("z");
        this.INPUTHANDLER.s.down = () => activeKeys.add("s");
        this.INPUTHANDLER.q.down = () => activeKeys.add("q");
        this.INPUTHANDLER.d.down = () => activeKeys.add("d");

        this.INPUTHANDLER.space.down = () => {
            const isTouchingCoffee = player1.intersectsMesh(this.cylinder, false)
            console.log(`Is cube touching coffee: ${isTouchingCoffee}`);
            if (isTouchingCoffee) {
                player1Aggregate.body.applyImpulse(
                    new BABYLON.Vector3(0, 3, 0),
                    player1.getAbsolutePosition()
                );
            }
        };

        // Stop applying forces
        this.INPUTHANDLER.z.up = () => activeKeys.delete("z");
        this.INPUTHANDLER.s.up = () => activeKeys.delete("s");
        this.INPUTHANDLER.q.up = () => activeKeys.delete("q");
        this.INPUTHANDLER.d.up = () => activeKeys.delete("d");

        this.scene.onBeforeRenderObservable.add(applyForce);

        const player2Keys = new Set();

        const applyForcePlayer2 = () => {
            if (player2Keys.has("up")) {
                player2Aggregate.body.applyForce(
                    new BABYLON.Vector3(0, 0, 5),
                    player2.getAbsolutePosition()
                );
            }
            if (player2Keys.has("down")) {
                player2Aggregate.body.applyForce(
                    new BABYLON.Vector3(0, 0, -5),
                    player2.getAbsolutePosition()
                );
            }
            if (player2Keys.has("left")) {
                player2Aggregate.body.applyForce(
                    new BABYLON.Vector3(-5, 0, 0),
                    player2.getAbsolutePosition()
                );
            }
            if (player2Keys.has("right")) {
                player2Aggregate.body.applyForce(
                    new BABYLON.Vector3(5, 0, 0),
                    player2.getAbsolutePosition()
                );
            }
        };

        this.INPUTHANDLER.up.down = () => player2Keys.add("up");
        this.INPUTHANDLER.down.down = () => player2Keys.add("down");
        this.INPUTHANDLER.left.down = () => player2Keys.add("left");
        this.INPUTHANDLER.right.down = () => player2Keys.add("right");

        this.INPUTHANDLER.ctrl.down = () => {
            const isTouchingCoffee = player2.intersectsMesh(this.cylinder, false);
            console.log(`Is player2 touching coffee: ${isTouchingCoffee}`);
            if (isTouchingCoffee) {
                player2Aggregate.body.applyImpulse(
                    new BABYLON.Vector3(0, 3, 0),
                    player2.getAbsolutePosition()
                );
            }
        };

        this.INPUTHANDLER.up.up = () => player2Keys.delete("up");
        this.INPUTHANDLER.down.up = () => player2Keys.delete("down");
        this.INPUTHANDLER.left.up = () => player2Keys.delete("left");
        this.INPUTHANDLER.right.up = () => player2Keys.delete("right");

        this.scene.onBeforeRenderObservable.add(applyForcePlayer2);

        const checkGroundCollision = () => {
            if (player1.intersectsMesh(ground, false)) {
                this.declareWinner("Sucre roux");
            } else if (player2.intersectsMesh(ground, false)) {
                this.declareWinner("Sucre blanc");
            }
        };

        this.scene.onBeforeRenderObservable.add(checkGroundCollision);

        return player1Aggregate;
    }

    declareWinner(winner) {
        if (this.winner) return;
        this.winner = winner;
        
        // display winner
        const messageDiv = document.createElement("div");
        messageDiv.style.position = "absolute";
        messageDiv.style.top = "50%";
        messageDiv.style.left = "50%";
        messageDiv.style.transform = "translate(-50%, -50%)";
        messageDiv.style.padding = "20px";
        messageDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        messageDiv.style.color = "white";
        messageDiv.style.fontSize = "24px";
        messageDiv.style.textAlign = "center";
        messageDiv.style.borderRadius = "10px";

        const winnerText = document.createElement("p");
        winnerText.textContent = `${winner} gagne!`;
        messageDiv.appendChild(winnerText);

        const resetButton = document.createElement("button");
        resetButton.textContent = "Reset";
        resetButton.style.padding = "10px 20px";
        resetButton.style.fontSize = "16px";
        resetButton.style.cursor = "pointer";
        resetButton.onclick = () => {
            document.body.removeChild(messageDiv);
            console.log("Resetting the game...");
            this.resetScene(); // RESET ******************************************
        };
        messageDiv.appendChild(resetButton);

        document.body.appendChild(messageDiv);
    }

    resetScene() {
        // trop galere là j'en peux plus
    }
}
