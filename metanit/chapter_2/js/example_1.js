(function() {
    debugger;

    //  отримати елемент канвас
    var canvas = document.getElementById("canvas");
    var context = null;

    try {
        //  пробуємо отримати стандартний контекст або експерементальний
        //  функція конструктор WebGLRenderingContext
        context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {}

    if (!context){
        alert("Your browser doesn't support WebGL");
        return;
    }

    //  приймає rgb
    context.clearColor(0.5, 0.5, 0.5, 1.0);

    //  очищає буфер заданих значень заданих в clearColor(), clearDepth() and clearStencil().
    //  the three masks are gl.COLOR_BUFFER_BIT, gl.DEPTH_BUFFER_BIT and gl.STENCIL_BUFFER_BIT
    context.clear(context.COLOR_BUFFER_BIT);

})();