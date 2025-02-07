const videos = [
  'https://youtu.be/U0kpKmENnLA?si=mu9R-mMImmd6yvI8',
  'https://www.youtube.com/embed/LXb3EKWsInQ',
  'https://www.youtube.com/embed/ScMzIvxBSi4'
];

const Video = () => {
  return (
    <div className='d-flex justify-content-center align-items-start min-vh-100 pt-5'>
      <div className='container text-center'>
        <div className='row justify-content-center'>
          <div className='col-md-10 d-flex justify-content-center'>
            <iframe
              width='100%'
              height='540'
              src='https://www.youtube.com/embed/U0kpKmENnLA'
              title='START EVERYDAY WITH SEN SPA'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
