import PropTypes from 'prop-types';
import './FaceDetector.css'

// https://www.shutterstock.com/image-photo/happy-businessman-enjoying-home-office-600nw-2257033579.jpg
// https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/15002495/friendscast.0.0.1429818191.jpg?quality=90&strip=all&crop=11.091820987654,0,77.816358024691,100
// https://mymodernmet.com/wp/wp-content/uploads/2020/10/faces-in-a-crowd.jpg

const FaceDetector = ({boxes, inputIMG}) => {
  return (
    <div className='center' style={{ position: "relative", width: "500px", height: "auto" }}>
      {inputIMG && <img id="inputImage" src={inputIMG} alt="clarify input or output image" width='500px' height="auto"></img>}

      {boxes && boxes.map((box, index) => (
        <div
          key={index}
          className="bounding-box"
          style={{
            top: `${box.topRow}px`,
            right: `${box.rightCol}px`,
            bottom: `${box.bottomRow}px`,
            left: `${box.leftCol}px`,
            boxShadow: `0 0 0 3px ${calculateColor(box.value)} inset`, // Dynamic color
          }}
        ></div>
    ))}
    </div>
  )
};

// Function to calculate the color based on the value
const calculateColor = (value) => {
  if (value < 0.2) {
    return `rgb(255, 0, 0)`; 
  } else if (value > 0.95 ){
    return `rgb(0, 255, 0)`;
  }else {
    return `rgb(${1 - Math.floor(value * 255)}, ${Math.floor(value * 255)}, 0)`;
  }
};



FaceDetector.propTypes = {
  boxes: PropTypes.arrayOf(
    PropTypes.shape({
      topRow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      rightCol: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      bottomRow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      leftCol: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired, // boxes must be an array of objects with specific properties
  inputIMG: PropTypes.string.isRequired, // inputIMG must be a string (URL)
};

export default FaceDetector
