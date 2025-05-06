/**
 * Classe principale du jeu utilisant une architecture Singleton.
 */
class Main {
    /**
     * Retourne l'instance unique de la classe Main.
     * @returns {Main} L'instance unique de la classe Main.
     */
    // SINGLETON ARCHITECTURE
    static getInstance() {
        this.getInstance(this.canvas);
    }

    /**
     * Crée ou retourne l'instance unique de la classe Main.
     * @param {string} gameSource - Le chemin source des ressources du jeu.
     * @param {HTMLCanvasElement} canvas - L'élément canvas HTML utilisé pour le rendu.
     * @returns {Main} L'instance unique de la classe Main.
     */
    static getInstance(gameSource,canvas) {
        if (!Main.instance) {
            Main.instance = new Main(gameSource,canvas);
        }
        return Main.instance;
    }

    /**
     * Constructeur de la classe Main.
     * @param {string} gameSource - Le chemin source des ressources du jeu.
     * @param {HTMLCanvasElement} canvas - L'élément canvas HTML utilisé pour le rendu.
     */
    constructor(gameSource,canvas) {
        if (Main.instance) return Main.instance;    // if already created, return the instance
        Main.instance = this;                       // if not set the instance to this
        // min
        /** @type {string} Chemin source des ressources du jeu. */
        this.gameSource = gameSource;
        /** @type {HTMLCanvasElement} Élément canvas HTML utilisé pour le rendu. */
        this.canvas = canvas;
        /** @type {BABYLON.Engine} Moteur Babylon.js pour le rendu 3D. */
        this.engine = new BABYLON.Engine(canvas, true);

        // game main utils
        /** @type {object|null} Scène actuelle du jeu. */
        this.currentScene = null;
        /** @type {object} État des entrées utilisateur. */
        this.inputStates = {};

        // other things to do
        this.others();
    }

    /**
     * Retourne le répertoire des assets du jeu.
     * @returns {string} Le chemin du répertoire des assets.
     */
    // config
    static getAssetsDir() {
        return this.getInstance().gameSource+"assets/";
    }

    /**
     * Définit la scène actuelle et configure la logique des entrées.
     * @param {object} argScene - La scène à définir comme scène actuelle.
     */
    setScene(argScene) {
        this.currentScene = argScene;
        this.setInputLogic(argScene,this.inputStates);
        this.currentScene.init().then(() => {
            console.log("scene init done");
            this.engine.runRenderLoop(() => {
                this.currentScene.scene.render();
            });
        });
    }

    /**
     * Initialise le jeu en chargeant la scène CoffeeScene.
     * @async
     */
    // INIT
    async init() {
        await this.setCoffeeScene();
    }

    /**
     * Charge et définit la scène CoffeeScene.
     * @async
     */
    async setCoffeeScene() {
        console.log("setCoffeeScene");
        this.setScene(
            new CoffeeScene(this.engine, this.canvas)
        );
    }
    
    /**
     * Configure la logique des entrées utilisateur pour une scène donnée.
     * @param {object} sceneContainer - Conteneur de la scène.
     * @param {object} inputStates - États des entrées utilisateur.
     */
    // INPUT LOGIC : lock and input states
    setInputLogic(sceneContainer,inputStates) {
        let scene = sceneContainer.scene;
        // pointer lock / escape with esc
        this.canvas.addEventListener("click", () => {
            if (!scene.alreadyLocked) {
                this.canvas.requestPointerLock();
            }
        });

        document.addEventListener("pointerlockchange", () => {
            console.log("pointerlockchange");
            let element = document.pointerLockElement || null;
            scene.alreadyLocked = element? true : false;
        })

        // KEYS
        inputStates.left = false;
        inputStates.right = false;
        inputStates.up = false;
        inputStates.down = false;

        inputStates.z = false;
        inputStates.q = false;
        inputStates.d = false;
        inputStates.s = false;

        inputStates.space = false;

        inputStates.ctrl = false;

        // input handler init
        sceneContainer.INPUTHANDLER = {
            // player 1 controls
            up: {
                down:       () => {console.log("up down");},
                pressed:    () => {console.log("up pressed");},
                up:         () => {console.log("up up");},
            },
            left: {
                down:       () => {console.log("left down");},
                pressed:    () => {console.log("left pressed");},
                up:         () => {console.log("left up");},
            },
            right: {
                down:       () => {console.log("right down");},
                pressed:    () => {console.log("right pressed");},
                up:         () => {console.log("right up");},
            },
            down: {
                down:       () => {console.log("down down");},
                pressed:    () => {console.log("down pressed");},
                up:         () => {console.log("down up");},
            },
            ctrl: {
                down:       () => {console.log("ctrl down");},
                pressed:    () => {console.log("ctrl pressed");},
                up:         () => {console.log("ctrl up");},
            },
            // player 2 controls
            z: {
                down:       () => {console.log("z down");},
                pressed:    () => {console.log("z pressed");},
                up:         () => {console.log("z up");},
            },
            q: {
                down:       () => {console.log("q down");},
                pressed:    () => {console.log("q pressed");},
                up:         () => {console.log("q up");},
            },
            d: {
                down:       () => {console.log("d down");},
                pressed:    () => {console.log("d pressed");},
                up:         () => {console.log("d up");},
            },
            s: {
                down:       () => {console.log("s down");},
                pressed:    () => {console.log("s pressed");},
                up:         () => {console.log("s up");},
            },
            space: {
                down:       () => {console.log("space down");},
                pressed:    () => {console.log("space pressed");},
                up:         () => {console.log("space up");},
            },
        };

        // KEYDOWN
        window.addEventListener('keydown', (event) => {
            if(!scene.alreadyLocked) {  return; } // if not locked, do nothing
            
            // if not already pressed, call the down function
            // if already pressed, call the pressed function
            // in both cases , set the input state to true

            if ((event.key === "ArrowLeft")) {
                if(!inputStates.left) {
                    sceneContainer.INPUTHANDLER.left.down();
                } else{
                    sceneContainer.INPUTHANDLER.left.pressed();
                }
                inputStates.left = true;
            } else if ((event.key === "ArrowUp")) {
                if(!inputStates.up) {
                    sceneContainer.INPUTHANDLER.up.down();
                } else{
                    sceneContainer.INPUTHANDLER.up.pressed();
                }
                inputStates.up = true;
            } else if ((event.key === "ArrowRight")) {
                if(!inputStates.right) {
                    sceneContainer.INPUTHANDLER.right.down();
                } else{
                    sceneContainer.INPUTHANDLER.right.pressed();
                }
                inputStates.right = true;
            } else if ((event.key === "ArrowDown")) {
                if(!inputStates.down) {
                    sceneContainer.INPUTHANDLER.down.down();
                } else{
                    sceneContainer.INPUTHANDLER.down.pressed();
                }
                inputStates.down = true;
            } else if ((event.key === "z")) {
                if(!inputStates.down) {
                    sceneContainer.INPUTHANDLER.z.down();
                } else{
                    sceneContainer.INPUTHANDLER.z.pressed();
                }
                inputStates.z = true;
            } else if ((event.key === "q")) {
                if(!inputStates.down) {
                    sceneContainer.INPUTHANDLER.q.down();
                } else{
                    sceneContainer.INPUTHANDLER.q.pressed();
                }
                inputStates.q = true;
            } else if ((event.key === "s")) {
                if(!inputStates.down) {
                    sceneContainer.INPUTHANDLER.s.down();
                } else{
                    sceneContainer.INPUTHANDLER.s.pressed();
                }
                inputStates.s = true;
            } else if ((event.key === "d")) {
                if(!inputStates.down) {
                    sceneContainer.INPUTHANDLER.d.down();
                } else{
                    sceneContainer.INPUTHANDLER.d.pressed();
                }
                inputStates.d = true;
            } else if (event.key === " ") {
                if(!inputStates.space) {
                    sceneContainer.INPUTHANDLER.space.down();
                } else{
                    sceneContainer.INPUTHANDLER.space.pressed();
                }
                inputStates.space = true;
            }
            else if (event.key === "Control") {
                if(!inputStates.ctrl) {
                    sceneContainer.INPUTHANDLER.ctrl.down();
                } else{
                    sceneContainer.INPUTHANDLER.ctrl.pressed();
                }
                inputStates.ctrl = true;
            }
        }, false);
        // RELEASE
        window.addEventListener('keyup', (event) => {
            if(!scene.alreadyLocked) {  return; } // if not locked, do nothing

            if ((event.key === "ArrowLeft")) {
                sceneContainer.INPUTHANDLER.left.up();
                inputStates.left = false;
            } else if ((event.key === "ArrowUp")) {
                sceneContainer.INPUTHANDLER.up.up();
                inputStates.up = false;
            } else if ((event.key === "ArrowRight")) {
                sceneContainer.INPUTHANDLER.right.up();
                inputStates.right = false;
            } else if ((event.key === "ArrowDown")) {
                sceneContainer.INPUTHANDLER.down.up();
                inputStates.down = false;
            } else if ((event.key === "z")) {
                sceneContainer.INPUTHANDLER.z.up();
                inputStates.z = false;
            } else if ((event.key === "q")) {
                sceneContainer.INPUTHANDLER.q.up();
                inputStates.q = false;
            } else if ((event.key === "s")) {
                sceneContainer.INPUTHANDLER.s.up();
                inputStates.s = false;
            } else if ((event.key === "d")) {
                sceneContainer.INPUTHANDLER.d.up();
                inputStates.d = false;
            } else if (event.key === " ") {
                sceneContainer.INPUTHANDLER.left.up();
                inputStates.space = false;
            } else if (event.key === "Control") {
                sceneContainer.INPUTHANDLER.ctrl.up();
                inputStates.ctrl = false;
            }

        }, false);

    }

    /**
     * Configure les événements supplémentaires (ex. redimensionnement de la fenêtre).
     */
    others() {
        // Resize
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
    }
}
