import React from 'react';
export default () => {
  return (
    <footer class='footer-wrapper light scrollspy-footer'>
      <div class='footer-top'>
        <div class='container'>
          <div class='row shrink-auto-md align-items-lg-center gap-10'>
            <div class='col-12 col-auto'>
              <div class='col-inner'>
                <ul class='footer-contact-list d-flex justify-content-between'>
                  <li>
                    <span class='icon-font text-primary inline-block-middle mr-5 font16'>
                      <i class='fa fa-phone'></i>
                    </span>{' '}
                    <span class='font700 text-black'>1 2258 2554 00</span>{' '}
                    <span class='text-muted'>Mon-Fri | 8.30am-6:30pm</span>
                  </li>
                  <li>
                    <span class='icon-font text-primary inline-block-middle mr-5 font16'>
                      <i class='fa fa-envelope'></i>
                    </span>{' '}
                    <span class='font700 text-black'>support@gmail.com</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr class='opacity-7' />
        </div>
      </div>

      <div class='main-footer'>
        <div class='container'>
          <div class='row gap-50'>
            <div class='col-12 col-lg-5'>
              <div class='footer-logo'>
                <img src='images/logo.png' alt='images' />
              </div>

              <p class='mt-20'>
                Excited him now natural saw passage offices you minuter. At by
                asked being court hopes. Farther so friends am to detract.
                Forbade concern do private be. Offending residence but men
                engrossed shy.
              </p>

              <a
                href='tour-detail-02.html#'
                class='text-capitalize font14 h6 line-1 mb-0 font500 mt-30'
              >
                read more{' '}
                <i class='elegent-icon-arrow_right font18 inline-block-middle'></i>
              </a>
            </div>

            <div class='col-12 col-lg-7'>
              <div class='col-inner'>
                <div class='row shrink-auto-sm gap-30'>
                  <div class='col-6 col-shrink'>
                    <div class='col-inner'>
                      <h5 class='footer-title'>About company</h5>
                      <ul class='footer-menu-list set-width'>
                        <li>
                          <a href='tour-detail-02.html#'>Who we are</a>
                        </li>
                        <li>
                          <a href='tour-detail-02.html#'>Careers</a>
                        </li>
                        <li>
                          <a href='tour-detail-02.html#'>Company history</a>
                        </li>
                        <li>
                          <a href='tour-detail-02.html#'>Legal</a>
                        </li>
                        <li>
                          <a href='tour-detail-02.html#'>Partners</a>
                        </li>
                        <li>
                          <a href='tour-detail-02.html#'>Privacy notice</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class='col-6 col-shrink'>
                    <div class='col-inner'>
                      <h5 class='footer-title'>Customer Service</h5>
                      <ul class='footer-menu-list set-width'>
                        <li>
                          <a href='tour-detail-02.html#'>Payment</a>
                        </li>
                        <li>
                          <a href='tour-detail-02.html#'>Feedback</a>
                        </li>
                        <li>
                          <a href='tour-detail-02.html#'>Contact us</a>
                        </li>
                        <li>
                          <a href='tour-detail-02.html#'>Our Service</a>
                        </li>
                        <li>
                          <a href='tour-detail-02.html#'>FAQ</a>
                        </li>
                        <li>
                          <a href='tour-detail-02.html#'>Site map</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class='col-12 col-auto'>
                    <div class='col-inner'>
                      <h5 class='footer-title'>Newsletter &amp; Social</h5>
                      <p class='font12'>
                        Savings her pleased are several started females met.
                        Short her not among being any.
                      </p>
                      <form class='footer-newsletter mt-20'>
                        <div class='input-group'>
                          <input
                            type='email'
                            class='form-control'
                            placeholder='Email address'
                          />
                          <div class='input-group-append'>
                            <button class='btn btn-primary' type='button'>
                              <i class='far fa-envelope'></i>
                            </button>
                          </div>
                        </div>
                      </form>
                      <div class='footer-socials mt-20'>
                        <a href='tour-detail-02.html#'>
                          <i class='fab fa-facebook-square'></i>
                        </a>
                        <a href='tour-detail-02.html#'>
                          <i class='fab fa-twitter-square'></i>
                        </a>
                        <a href='tour-detail-02.html#'>
                          <i class='fab fa-google-plus-square'></i>
                        </a>
                        <a href='tour-detail-02.html#'>
                          <i class='fab fa-pinterest-square'></i>
                        </a>
                        <a href='tour-detail-02.html#'>
                          <i class='fab fa-flickr'></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class='bottom-footer'>
        <div class='container'>
          <div class='row shrink-auto-md gap-10 gap-40-lg'>
            <div class='col-auto'>
              <div class='col-inner'>
                <ul class='footer-menu-list-02'>
                  <li>
                    <a href='tour-detail-02.html#'>Cookies</a>
                  </li>
                  <li>
                    <a href='tour-detail-02.html#'>Policies</a>
                  </li>
                  <li>
                    <a href='tour-detail-02.html#'>Terms</a>
                  </li>
                  <li>
                    <a href='tour-detail-02.html#'>Blogs</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class='col-shrink'>
              <div class='col-inner'>
                <p class='footer-copy-right'>
                  {' '}
                  &#169; 2020 – 2021{' '}
                  <span class='text-primary'>MyCompany Ltd.,</span> All Rights
                  Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
