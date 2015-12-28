(function() {

    var context;
    var shaderProgram;
    var vertexBuffer;
    var indexBuffer;

    // установка шейдеров
    function initShaders() {
        //  получаем шейдеры класу WebGLShader
        var fragmentShader = getShader(context.FRAGMENT_SHADER, 'shader-fs');
        var vertexShader = getShader(context.VERTEX_SHADER, 'shader-vs');

        //  создаем объект программы шейдеров класу WebGLProgram
        shaderProgram = context.createProgram();

        // прикрепляем к ней шейдеры
        context.attachShader(shaderProgram, vertexShader);
        context.attachShader(shaderProgram, fragmentShader);

        // связываем программу с контекстом webgl
        context.linkProgram(shaderProgram);

        if (!context.getProgramParameter(shaderProgram, context.LINK_STATUS)) {
            alert("Не удалось установить шейдеры");
            return;
        }

        context.useProgram(shaderProgram);

        //  установка атрибута программы
        shaderProgram.vertexPositionAttribute = context.getAttribLocation(shaderProgram, "aVertexPosition");
        context.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    }

    // Функция создания шейдера по типу и id источника в структуре DOM
    function getShader(type,id) {
        var source = document.getElementById(id).innerHTML;

        //  создаем шейдер WebGLShader по переданому типу context.VERTEX_SHADER or context.FRAGMENT_SHADER
        var shader = context.createShader(type);

        //  установка источника шейдера
        context.shaderSource(shader, source);

        // компилируем шейдер
        context.compileShader(shader);

        if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
            alert("Ошибка компиляции шейдера: " + context.getShaderInfoLog(shader));
            context.deleteShader(shader);
            return null;
        }
        return shader;
    }

    function myInitBuffers(){
        //  create and initializes a WebGLBuffer storing data such as vertices or colors
        var vertexBuffer = context.createBuffer();

        //  ARRAY_BUFFER || ELEMENT_ARRAY_BUFFER
        context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer);


        var triangleVertices = [
             0.0,  0.5, 0.0,
            -0.5, -0.5, 0.0,
             0.5, -0.5, 0.0
        ];

        //  load and lead to type coordinates into buffer
        context.bufferData(context.ARRAY_BUFFER, new Float32Array(triangleVertices), context.STATIC_DRAW);

        vertexBuffer.itemSize = 3;
        vertexBuffer.numberOfItems = 3;
    }

    function initBuffers() {

        var vertices =[
            -0.5, -0.5, 0.0,
            -0.5,  0.5, 0.0,
             0.5,  0.5, 0.0,
             0.5, -0.5, 0.0
        ];

        var indices = [0, 1, 2, 0, 3, 2];

        // установка буфера вершин
        vertexBuffer = context.createBuffer();

        context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer);
        context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertices), context.STATIC_DRAW);

        // указываем размерность
        vertexBuffer.itemSize = 3;

        // создание буфера индексов
        indexBuffer = context.createBuffer();
        context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, indexBuffer);
        context.bufferData(context.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), context.STATIC_DRAW);

        // указываем число линий. это число равно числу индексов
        indexBuffer.numberOfItems = indices.length;
    }

    function draw() {

        // установка фона
        context.clearColor(0.0, 0.0, 0.0, 1.0);

        // установка области отрисовки
        context.viewport(0, 0, context.viewportWidth, context.viewportHeight);

        context.clear(context.COLOR_BUFFER_BIT);

        //  задає атрибут або вказівник на читання із буфера вершин
        context.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vertexBuffer.itemSize, context.FLOAT, false, 0, 0);

        // отрисовка примитивов - линий
        context.drawElements(context.LINE_LOOP, indexBuffer.numberOfItems, context.UNSIGNED_SHORT, 0);
    }

    window.onload = function() {
        var canvasEl = document.getElementById("canvas");

        try {
            context = canvasEl.getContext("webgl") || canvasEl.getContext("experimental-webgl");
        }
        catch(e) {}

        if (!context) {
            console.error("Context is not defined");
            return;
        }

        // установка размеров области рисования
        context.viewportWidth = canvasEl.width;
        context.viewportHeight = canvasEl.height;

        initShaders();
        initBuffers();
        draw();
    }

})();