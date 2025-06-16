import "./ImageLinkForm.css"
import PropTypes from 'prop-types';

const ImageLinkForm = (({ onInputchange, onButtonSubmit }) => {
  return (
    <div className='ba pa3'>
      <p className="f3 center">please insert url to the img</p>
      <div className="center pa4br3 shadow-5">
        <input type="ul" className="f4 pa4 w-70 center" onChange={onInputchange} required ></input>
        <button className="w-30 grow f4 link ph3 pv2 dib pa4 bg-light-purple" onClick={onButtonSubmit}>Detect</button>
      </div>
    </div>
  )
})

ImageLinkForm.propTypes = {
  onInputchange: PropTypes.func.isRequired,
  onButtonSubmit: PropTypes.func.isRequired,
};

export default ImageLinkForm
