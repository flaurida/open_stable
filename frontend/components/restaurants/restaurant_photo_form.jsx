import React from 'react';
import { withRouter } from 'react-router';

class RestaurantPhotoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: null,
      imageFile: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateFile = this.updateFile.bind(this);
  }

  clearInput() {
    this.setState({ imageUrl: null, imageFile: null });
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    if (this.state.imageFile) {
      formData.append("photo[image]", this.state.imageFile);
    }

    this.props.createPhoto(this.props.restaurantId, formData).then(photo => {
      this.clearInput();
      this.props.router.push(`/restaurants/${photo.restaurant_id}`);
    });
  }


  updateFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({ imageFile: file, imageUrl: fileReader.result });
    };

    if (file) {
      fileReader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "", imageFile: null });
    }
  }

  submitButton() {
    if (this.state.imageFile) {
      return <input type="submit" value="Submit" />;
    }

    return null;
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="restaurant-img" className="img-upload">Upload Image</label>
        <input id="restaurant-img" type="file" onChange={this.updateFile} className="hidden" />
        <img src={this.state.imageUrl} />
        { this.submitButton() }
      </form>
    );
  }
}

export default withRouter(RestaurantPhotoForm);
