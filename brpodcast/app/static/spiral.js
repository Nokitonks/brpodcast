const canvas = document.getElementById('sineCanvas');
const canvas2 = document.getElementById('sineCanvas2');
const context = canvas.getContext('2d');
const context2 = canvas2.getContext('2d');
function convertRange( value, r1, r2 ) { 
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}
// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight*4;
canvas2.width = canvas.width;
canvas2.height = canvas.height;
var frequency = Math.PI/170;
var amplitude = canvas.width / 4;

function are_close(val1,val2,diff){
  if (val1 >= val2-diff && val1 <= val2+diff){

    return true
  }
  else
    return false
}
function drawSineWave() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  context2.clearRect(0, 0, canvas2.width, canvas2.height);

  // Set the amplitude and frequency of the sine wave
  var offset = Math.PI/4;
  var flex_offset = 0;
  var flex_offset2 = 0;
  var close_value = frequency/2;
  //The curve outline we are currently drawing
  var curr_curve = 0;
  let y = 0;
  let y2 = 0;

  // Draw the sine wave
  context.beginPath();
  context2.beginPath();
  context.moveTo( canvas.width/2,0);
  context2.moveTo( canvas.width/2,0);

  //Right = 0 left = 1
  var dir_flag = 0
  while (y < canvas.height || y2 < canvas.height) {
    const x =  Math.sin((frequency * y)+flex_offset);
    const x2 =  Math.sin((frequency * y2)+flex_offset2);
    context.lineTo((x*amplitude)+canvas.width/2, y );
    context2.lineTo((x2*amplitude)+canvas.width/2, y2);
    if (y == y2)( y += 1);
    y2 += 1;
    //Extreme point happens when Math.sin(freq * y) = 1
    //FOR LHS
    const next_x = Math.sin((frequency * (y+1))+flex_offset)  
    if (dir_flag == 1 && (next_x >= x)){
      y += Math.round(offset/frequency);
      flex_offset -= offset;
      dir_flag = 0;
    }
    //We have hit an intersection when my value and my value + offset is the same
    var offset_x = Math.sin((frequency * y) + ((flex_offset+offset)))
    var offset_x2 = Math.sin((frequency * y2) + (flex_offset2+offset))
    if (dir_flag == 0 && (are_close(offset_x,x,close_value)) && x > 0 )
    {
      flex_offset += offset;
      dir_flag = 1;
    }
    if (are_close(offset_x2,x2,close_value)){
      flex_offset2 += flex_offset;
    }
    offset_x2 = Math.sin((frequency * y2) +(flex_offset2-offset))
    if (are_close(offset_x2,x2,close_value)){
      flex_offset2 = flex_offset;
    }
  }
  context.lineTo( canvas.width/2,y);
  context2.lineTo( canvas.width/2,y2);

  flex_offset = flex_offset == 0 ? offset : 0;
  dir_flag =  flex_offset == 0 ? 1 : 0;
  y2 = canvas.height;
  while (y > 0 || y2 > 0 ) {
    const x =  Math.sin((frequency * y) +flex_offset);
    const x2 =  Math.sin(frequency * y2);
    context.lineTo((x*amplitude)+canvas.width/2, y );
    context2.lineTo((x2*amplitude)+canvas.width/2, y2 );
    y -= 1;
    y2 -= 1;

    //Extreme point happens when Math.sin(freq * y) = 1
    const next_x = Math.sin((frequency * (y-1)) + (flex_offset))
    if (dir_flag != 0 && (next_x <= x)){
      y -= Math.round(offset/frequency);
      flex_offset += offset;
      dir_flag = 0;
    }

    //We have hit an intersection when my value and my value + offset is the same
    const offset_x = Math.sin((frequency * y)+(flex_offset-offset))
    if (dir_flag != 1 && (are_close(offset_x,x,close_value)))
    {
      flex_offset -= offset;
      dir_flag = 1;
    }
  }
  // Set the line color and width
  context.strokeStyle = '#000088';
  context.lineWidth = 3;
  context.closePath()
  context.fillStyle = 'rgb(50,200,50)';
  context.fill();

  context2.closePath()
  context2.fillStyle = 'rgb(55,150,50)';
  context2.fill();
  // Draw the sine wave


  // Request the next animation frame
}
// Start drawing the sine wave
drawSineWave();
