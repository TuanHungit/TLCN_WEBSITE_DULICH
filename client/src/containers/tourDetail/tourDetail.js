import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import PageTitle from '../../components/layout/PageTitle/PageTile';
import BookingTour from '../../components/booking/bookingTourAside/bookingTourAside';
import ContentDetail from '../../components/tour/tourDetail/detailContent/detailContent';
import Locations from '../../components/tour/tourDetail/locations/locations';
import Map from '../../components/tour/tourDetail/map/map';

import ReviewTour from '../../components/tour/tourDetail/reviewTour/reviewTour';
import * as actionCreators from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import SimilarTour from '../../components/tour/tourDetail/similarTour/similarTour';
import BookingModal from '../../components/booking/bookingModal/bookingModal';

const TourDetail = (props) => {
  useEffect(() => {
    const {
      match: { params },
    } = props;
    props.onFetchTourDetail(params.slug);
    props.onCheckUserView(params.slug);
    window.scrollTo(0, 0);
  }, [props.match.params.slug]);

  useEffect(() => {
    if (props.tourDetail) {
      props.onSetBooking({
        startDate: props.tourDetail.availableDate[0],
        numOfPerson: 1,
        total: props.tourDetail.price,
      });
      const tourId = props.tourDetail.id;
      props.onFetchReviewRourList(tourId, 1, 3, [
        'review',
        'user',
        'createdAt',
        'rating',
      ]);
      props.onFetchSimilarTour(tourId, 1, 4, [
        'duration',
        'name',
        'price',
        'ratingsQuantity',
        'ratingsAverage',
        'startLocation',
        'country',
        'slug',
      ]);
    }
  }, [props.tourDetail, props.match.params.slug]);

  useEffect(() => {
    props.onCheckUserView(props.match.params.slug);
  }, [props.isAuthencated, props.userReview]);

  const changePersonHandler = (event) => {
    const numOfPerson = event.target.value;
    const price = props.tourDetail.price;
    const total = numOfPerson * price;

    props.onSetBooking({
      numOfPerson: event.target.value,
      total: total,
    });
  };
  const changeDateHandler = (date) => {
    props.onSetBooking({
      startDate: date,
    });
  };

  const data = props.tourDetail;
  let tourDetail = props.tourDetailError ? (
    <p>Tour detail can't be loaded!</p>
  ) : (
    <div>
      <div class='pt-0 pt-xl-15'></div>
      <Spinner />
    </div>
  );

  let similarTourList = props.similarTourError ? (
    <p>Similar Tour can't be loaded!</p>
  ) : (
    <Spinner />
  );
  if (props.similarTourList) {
    similarTourList = <SimilarTour tourSimilarList={props.similarTourList} />;
  }
  let userReview = {};
  if (props.userReview !== null) {
    userReview = props.userReview;
  }
  if (data) {
    tourDetail = (
      <div>
        <div className='body-inner'>
          <div class='main-wrapper scrollspy-container'>
            <section
              class='page-wrapper page-detail pt-0'
              style={{ backgroundColor: '#f3f3f3' }}
            >
              <div class='pt-0 pt-xl-15'></div>

              <PageTitle title={data.name} />

              <div class='container'>
                <div class='row gap-20 gap-lg-40'>
                  <div
                    class='col-12 col-lg-8'
                    style={{ backgroundColor: '#fff' }}
                  >
                    <div class='content-wrapper'>
                      <ContentDetail
                        content={data}
                        availableDate={data.availableDate}
                      />
                      <div class='mb-50'></div>

                      <Locations
                        content={{
                          summary: data.summary,
                          locations: { ...data.locations },
                        }}
                      />
                      <Map locations={data.locations} />
                      {similarTourList}

                      <ReviewTour
                        reviews={props.reviewTourList}
                        tourId={props.tourDetail.id}
                        onFetchReviewRourList={props.onFetchReviewRourList}
                        pageCount={props.pageCount}
                        reviewLoading={props.reviewLoading}
                        onReviewTour={props.onReviewTour}
                        userReview={userReview}
                        ratingsAverage={props.tourDetail.ratingsAverage}
                        onCheckUserView={props.onCheckUserView}
                      />
                    </div>
                  </div>
                  {props.bookingInfo ? (
                    <BookingTour
                      numOfPerson={props.bookingInfo.numOfPerson}
                      total={props.bookingInfo.total}
                      price={props.tourDetail.price}
                      duration={data.duration}
                      changePersonHandler={(event) =>
                        changePersonHandler(event)
                      }
                      date={props.bookingInfo.startDate}
                      slug={data.slug}
                    />
                  ) : null}
                  <BookingModal
                    duration={data.duration}
                    start={data.availableDate}
                    price={data.price}
                    changeDateHandler={changeDateHandler}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
  return <div>{tourDetail}</div>;
};
const mapStateToProps = (state) => {
  return {
    similarTourError: state.tour.similarTourError,
    similarTourList: state.tour.similarTourList,
    tourDetailError: state.tour.tourDetailError,
    tourDetail: state.tour.tourDetail,
    reviewTourListError: state.review.reviewTourListError,
    reviewTourList: state.review.reviewTourList,
    pageCount: state.review.pageCount,
    bookingInfo: state.booking.bookingInfo,
    reviewLoading: state.review.loading,
    userReview: state.review.userReview,
    isAuthencated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTourDetail: (slug) => dispatch(actionCreators.fetchTourDetail(slug)),
    onFetchReviewRourList: (tourId, page, limit, options) =>
      dispatch(
        actionCreators.fetchRevireTourList(tourId, page, limit, options)
      ),
    onFetchSimilarTour: (tourId, page, limit, options) => {
      dispatch(actionCreators.fetchSimilarTour(tourId, page, limit, options));
    },
    onSetBooking: (data) => {
      dispatch(actionCreators.setBookingInfo(data));
    },
    onReviewTour: (tourId, data) =>
      dispatch(actionCreators.reviewTour(tourId, data)),
    onCheckUserView: (slug) => {
      dispatch(actionCreators.checkUserReview(slug));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TourDetail);
