import React from 'react';

class Notices extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.clearNoticesTimeout(nextProps);
  }

  componentDidMount() {
    this.clearNoticesTimeout(this.props);
  }

  clearNoticesTimeout(props) {
    if (!props.notices) return;
    setTimeout(() => {
      props.clearNotices();
    }, 3000);
  }

  render() {
    if (!this.props.notices) return null;

    return (
      <div className="notices">
        { this.props.notices }
      </div>
    );
  }
}

export default Notices;
