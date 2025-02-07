const images = [
  'https://img1.kienthucvui.vn/uploads/2021/01/13/anh-dep-ve-spa_022205055.jpg',
  'https://img1.kienthucvui.vn/uploads/2021/01/13/anh-dep-ve-spa_022205055.jpg',
  'https://img1.kienthucvui.vn/uploads/2021/01/13/anh-dep-ve-spa_022205055.jpg'
]

const Picture = () => {
  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100'>
      <div className='container py-4 text-center'>
        <div className='w-100'>
          <div className='row g-4 justify-content-center'>
            {/* Ảnh lớn bên trái */}
            <div className='col-md-7'>
              <img
                src={images[0]}
                alt='Spa Image'
                className='img-fluid w-100-lg'
                style={{ height: '500px', objectFit: 'cover' }}
              />
            </div>

            {/* 2 ảnh nhỏ bên phải */}
            <div className='col-md-4'>
              <div className='row mb-4'>
                <div className='col-12'>
                  <img
                    src={images[1]}
                    alt='Spa Image'
                    className='img-fluid w-100'
                    style={{ height: '238px', objectFit: 'cover' }}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <img
                    src={images[2]}
                    alt='Spa Image'
                    className='img-fluid w-100'
                    style={{ height: '238px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row g-4 justify-content-center mt-1'>
            {/* 2 ảnh nhỏ bên trái */}
            <div className='col-md-4'>
              <div className='row mb-4'>
                <div className='col-12'>
                  <img
                    src={images[1]}
                    alt='Spa Image'
                    className='img-fluid w-100'
                    style={{ height: '238px', objectFit: 'cover' }}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <img
                    src={images[2]}
                    alt='Spa Image'
                    className='img-fluid w-100'
                    style={{ height: '238px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>

            {/* Ảnh lớn bên phải */}
            <div className='col-md-7'>
              <img
                src={images[0]}
                alt='Spa Image'
                className='img-fluid w-100-lg'
                style={{ height: '500px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Picture
