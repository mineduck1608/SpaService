const Video = () => {
  return (
    <div className='d-flex justify-content-center align-items-start pb-4 pt-4'>
      <div className='container text-center'>
        <div className='row justify-content-center'>
          <div className='col-md-12 d-flex justify-content-center'>
            <iframe
              width='100%'
              height='730'
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
  )
}

export default Video
