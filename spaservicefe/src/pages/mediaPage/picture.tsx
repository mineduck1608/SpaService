const images = [
  'https://img1.kienthucvui.vn/uploads/2021/01/13/anh-dep-ve-spa_022205055.jpg',
  'https://img1.kienthucvui.vn/uploads/2021/01/13/anh-dep-ve-spa_022205055.jpg',
  'https://img1.kienthucvui.vn/uploads/2021/01/13/anh-dep-ve-spa_022205055.jpg',
  'https://img1.kienthucvui.vn/uploads/2021/01/13/anh-dep-ve-spa_022205055.jpg',
  'https://img1.kienthucvui.vn/uploads/2021/01/13/anh-dep-ve-spa_022205055.jpg',
  'https://img1.kienthucvui.vn/uploads/2021/01/13/anh-dep-ve-spa_022205055.jpg'
]



const Picture = () => {
  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100'>
      <div className='container py-4 text-center'>
        <div className='w-100'>
          <div className='row g-3 justify-content-center'>
            <div className='col-md-6'>
              <img src={images[0]} alt='Spa Image' className='img-fluid w-100' style={{ maxHeight: '500px' }} />
            </div>
            <div className='col-md-3'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <img src={images[1]} alt='Spa Image' className='img-fluid w-100' style={{ maxHeight: '205px' }} />
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <img src={images[2]} alt='Spa Image' className='img-fluid w-100' style={{ maxHeight: '205px' }} />
                </div>
              </div>
            </div>
          </div>

          <div className='row g-3 mt-3 justify-content-center'>
            <div className='col-md-3'>
              <div className='row mb-3'>
                <div className='col-12'>
                  <img src={images[3]} alt='Spa Image' className='img-fluid w-100' style={{ maxHeight: '205px' }} />
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <img src={images[4]} alt='Spa Image' className='img-fluid w-100' style={{ maxHeight: '205px' }} />
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <img src={images[5]} alt='Spa Image' className='img-fluid w-100' style={{ maxHeight: '500px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Picture
