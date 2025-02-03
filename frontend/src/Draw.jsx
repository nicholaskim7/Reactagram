import React, { useRef, useEffect, useState } from 'react';

function Draw() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const devicePixelRatio = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    context.scale(devicePixelRatio, devicePixelRatio);
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setDrawing(true);
  };

  const endDrawing = () => {
    contextRef.current.closePath();
    setDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  return (
    <div className="bg-light-blue">
        <h4 className="mt-5">click and drag!</h4>
        <h5 className="mt-2">Warning your work will not be saved!</h5>
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
        />
    </div>
  );
}

export default Draw;
