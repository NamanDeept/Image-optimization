const input = document.querySelector('input[type="file"]');
const text = document.querySelector('h3');

input.addEventListener('change',function(event){
	var reader = new FileReader();
	console.log(input.files);
	reader.onload = function(){
		var img = new Image();
		
		console.log(img.width+" "+img.height);
		img.onload = function(){
            var canvasWidth = 600;
            var canvasHeight = 400;
			var canvas = document.createElement('canvas');
			var context = canvas.getContext('2d');
			canvas.width = canvasWidth;
			canvas.height = canvasHeight;
			context.drawImage(img,0,0,600,400);
			const imageData = context.getImageData(0,0,canvasWidth,canvasHeight);
			console.log(canvas.width+" "+canvas.height);
			context.putImageData(imageData,0,0);
			
			input.parentNode.removeChild(input);
			text.parentNode.removeChild(text);
		    var canvas2 = document.createElement('canvas');
		    var context2 = canvas2.getContext('2d');
		    canvas2.width = canvasWidth;
		    canvas2.height = canvasHeight;
		    context2.drawImage(img,0,0,canvasWidth,canvasHeight);
		    var imageData2 = context2.getImageData(0,0,canvasWidth,canvasHeight);
		    
		    var data = imageData2.data;
		    /*
		     * Code for the image in the grayScale.
		     */
		    for(var i = 0 ; i <=data.length ; i+=4)//for r,g,b,a values
		    { 
		    	const average = (data[i] + data[i+1] + data[i+2])/3;
		    	data[i]  = average;
		    	data[i+1] = average;
		    	data[i+2] = average;
		    }
		    context2.putImageData(imageData2,0,0);
		    document.body.appendChild(canvas);
		    document.body.appendChild(canvas2);
		    var canvas3 = document.createElement('canvas');
		    var context3 = canvas3.getContext('2d');
		    canvas3.width = canvasWidth;
		    canvas3.height = canvasHeight;
		    context3.drawImage(img,0,0,canvasWidth,canvasHeight);
		    var imageData3 = context3.getImageData(0,0,canvasWidth,canvasHeight);
		     var data1 = imageData3.data;
		    /*
		     * Implementing image dithering in javaScript (a 3 level dithering)
		     * the dithering algorithm so used is called 'Floyd-Steinberg Algorithm' of dithering
		     * Reference given in wikipedia page :https://en.wikipedia.org/wiki/Floyd%E2%80%93Steinberg_dithering
		     */
		    const n = 3;
		    for(var i = 0 ; i <=data1.length ; i+=4)//for r,g,b,a values
		    { 
		    	const newRed   = Math.round(n *  data1[i]/255) * (255/n);
		    	const newGreen = Math.round(n * data1[i+1]/255)* (255/n);
		    	const newBlue =  Math.round(n * data1[i+2]/255)* (255/n);
		    	const red = data1[i];
		    	const green = data1[i+1];
		    	const blue = data1[i+2];
                const redError = red - newRed;
                const greenError = green - newGreen;
                const blueError = blue - newBlue;
                if(i+6 <=data.length){
                    var rightRed = data1[i+4];
                    var rightGreen = data1[i+5];
                    var rightBlue = data1[i+6];
                    rightRed+= redError*(7/16);
                    rightGreen+= greenError*(7/16);
                    rightBlue+= blueError*(7/16);
                    data1[i+4] = rightRed;
                    data1[i+5] = rightGreen;
                    data1[i+6] = rightBlue;
                }
                if((i+4*(canvasWidth-1)+2)<=data.length){
                	var leftBottomRed = data1[i+4*(canvasWidth-1)];
                    var leftBottomGreen = data1[i+4*(canvasWidth-1)+1];
                    var leftBottomBlue = data1[i+4*(canvasWidth-1)+2];
                    leftBottomRed+=redError*(3/16);
                    leftBottomBlue+=blueError*(3/16);
                    leftBottomGreen+=greenError*(3/16);
                    data1[i+4*(canvasWidth-1)]=leftBottomRed;
                    data1[i+4*(canvasWidth-1)+1]=leftBottomGreen;
                    data1[i+4*(canvasWidth-1)+2]=leftBottomBlue; 
                }
                if((i+4*(canvasWidth)+2)<=data.length){
                	var downRed  = data1[i+4*(canvasWidth)];
                    var downGreen = data1[i+4*(canvasWidth)+1];
                    var downBlue = data1[i+4*(canvasWidth)+2];
                    downRed+=redError*(5/16);
                    downGreen+=greenError*(5/16);
                    downBlue+=blueError*(5/16);
                    data1[i+4*(canvasWidth)]=downRed;
                    data1[i+4*(canvasWidth)+1]=downGreen;
                    data1[i+4*(canvasWidth)+2]=downBlue;
                }
                if((i+4*(canvasWidth+1)+2)<=data.length){
                	var rightBottomGreen = data1[i+4*(canvasWidth+1)+1];
                    var rightBottomBlue = data1[i+4*(canvasWidth+1)+2];
                    var rightBottomRed = data1[i+4*(canvasWidth+1)];
                    rightBottomRed+=redError*(1/16);
                    rightBottomGreen+=greenError*(1/16);
                    rightBottomBlue+=blueError*(1/16);
                    data1[i+4*(canvasWidth+1)] = rightBottomRed;
                    data1[i+4*(canvasWidth+1)+1] = rightBottomGreen;
                    data1[i+4*(canvasWidth+1)+2] = rightBottomBlue;
                }
                data1[i]=newRed;
                data1[i+1] = newGreen;
                data1[i+2] = newBlue;
		    }
		    context3.putImageData(imageData3,0,0);
		    document.body.appendChild(canvas3);

		    var canvas4 = document.createElement('canvas');
		    var context3 = canvas4.getContext('2d');
		    canvas4.width = canvasWidth;
		    canvas4.height = canvasHeight;
		    context3.drawImage(img,0,0,canvasWidth,canvasHeight);
		    var imageData3 = context3.getImageData(0,0,canvasWidth,canvasHeight);
		    
		    var data4 = imageData3.data;
		    /*
		     * Code for inverting the colors of the image (experimental)
		     */ 
		    for(var i = 0 ; i <=data4.length ; i+=4)
		    { 
		    	var red = data4[i];
		    	var green = data4[i+1];
		    	var blue = data4[i+2];
		    	data4[i] = 255 - red;
		    	data4[i+1] =255-green;
		    	data4[i+2] = 255-blue;
		    }
		    context3.putImageData(imageData3,0,0);
		    document.body.appendChild(canvas4);
		}
		img.src = reader.result;
		
		console.log(img.clientWidth+" "+img.clientHeight);
	}
	reader.readAsDataURL(input.files[0]);
},false);