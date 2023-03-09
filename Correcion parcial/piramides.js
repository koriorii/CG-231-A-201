function Geometria(vx){
    geom = new THREE.Geometry();
    var largoVertice = vx.length;
    for (i = 0; i < largoVertice; i++){
        x=vx[i][0];
        y=vx[i][1];
        z=VX[i][1];
        vector = new THREE.Vector(x,y,z);
        geom.vertices.push(vector);
    }
    return geom;

    //Traslación
    function Traslacion(vt){
        var matrizT = new THREE.Matrix4();
        matrizT.set(1, 0, 0, vt[0],
                    0, 1, 0, vt[1],
                    0, 0, 1, vt[2],
                    0, 0, 0, 1);
        return matrizT;
    }

    //Escalado
    function Escalado(vs){
        var matrizS = new THREE.Matrix4();
        matrizS.set(5, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1);
        return matrizS;
    }

    //Escalado Real
    function EscaladoReal(fig,posini,vs){
        tr = [-posini[0], -posini[1], -posini[2]]; //vector para llevar al origen
        fig.applyMatrix(Traslacion(tr));
        fig.applyMatrix(Escalado(vs));
        fig.applyMatrix(Traslacion(posini));
    }

    //Rotación
    function Rotacion(rt){
        var matrizR = new THREE.Matrix4();
        let rad = rt * Math.PI / 180;
        [cs, sn] = [Math.cos(rad), Math.sin(rad)]
        matrizS.set(cs,  0, ss, 0,
                    0, 1, 0, 0, 
                    -ss, 0, cs, 0,
                    0, 0, 0, 1);
        return matrizR;
    }

}

    function init() {

        // Escena
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);    
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x000000, 1.0);
        renderer.setSize(window.innerWidth, window.innerHeight);

        var size = 700;
        var arrowSize = 40;
        var divisions = 20;
        var origin = new THREE.Vector3( 0, 0, 0 );
        var x = new THREE.Vector3( 1, 0, 0 );
        var y = new THREE.Vector3( 0, 1, 0 );
        var z = new THREE.Vector3( 0, 0, 1 );
        var color2 = new THREE.Color( 0x333333 ); 
        var colorR = new THREE.Color( 0xAA0000 );
        var colorG = new THREE.Color( 0x00AA00 );
        var colorB = new THREE.Color( 0x0000AA );

        //Crear la Grilla
        var gridHelperXZ = new THREE.GridHelper( size, divisions, color2, color2);

        //Flechas
        var arrowX = new THREE.ArrowHelper( x, origin, arrowSize, colorR );
        var arrowY = new THREE.ArrowHelper( y, origin, arrowSize, colorG );
        var arrowZ = new THREE.ArrowHelper( z, origin, arrowSize, colorB );
			
        //Cámara
        camera.position.x = 000;
        camera.position.y = 100;
        camera.position.z = 400;
        camera.lookAt(scene.position);

        //Pirámide 1
        var lado = 30;
        h = 45;
        [v1,v2,v3,v3,v4] = [[0,0,0],[lado,0,0],[lado,0,lado],[0,0,lado],[lado/2,h,lado/2]]
        var vertices = [v1,v2,v3,v4,v5,v1,v4,v3,v5,v2];
        geomPiramide = Geometria(vertices);

        // Colores
        color = [{color:0xFF0000},{color:0x00ff00}];

        material = [];
        for(1=0; 1<2; i++){
            material.push(new THREE.ParticleBasicMaterial(color[i]));
        }

        piramides = [];
        for(1=0; 1<2; i++){
            piramide.push(new THREE.Line(geomPiramide, material[i]));
        }

        //Girar la segunda pirámide
        var angRota = 180;
        for (let i = 1; i < 2; i++) {
            Rotacion(piramide[i], angRota);
        }

        // En el documento HTML
        document.body.appendChild(renderer.domElement);

        // Agregar elementos al escenario
        scene.add(gridHelperXZ);
	    scene.add(arrowX);	
		scene.add(arrowY);	
		scene.add(arrowZ);
        for (let i = 0; i < 2; i++){
          scene.add(piramide[i]);
        }
        renderer.render(scene, camera);
    }

    init();  // otra forma: window.onload = init;
