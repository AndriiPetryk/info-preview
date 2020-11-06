import { connect } from 'react-redux';
import pluralize from 'pluralize';
import DetailsInfoModal from './DetailsInfoModal';

const mapStateToProps = (state) => {
  const { infoReducer, infoReducerDetails } = state;
  const { ids: infosIds } = infoReducer;
  const { collectionDetails: infoDetails } = infoReducerDetails;

  const { dataReceived: infoDetailsReceived } = infoReducerDetails;

  let infoTitle;
  let subDescription;
  let location;
  let groupSize;
  let duration;
  let infoCategory;
  let infoId;
  let catalogDetailImagesUrl;

  if (infoDetails.length !== 0) {
    const infoDetailsData = infoDetails;
    const {
      id,
      name,
      subdescription,
      catalog_detail_images_url,
      location: infoLocation,
      details: { group_size_number, duration_value, duration_type },
      category: { name: infoName },
    } = infoDetailsData[0];

    infoId = id;
    infoTitle = name;
    subDescription = subdescription;
    catalogDetailImagesUrl = catalog_detail_images_url;
    location = infoLocation;
    groupSize = +group_size_number;
    infoCategory = infoName;
    let customDuration = duration_type === 'custom' ? '' : duration_type;
    customDuration = pluralize(customDuration, +duration_value);
    duration = `${duration_value} ${customDuration}`;
  }

  return {
    infoId,
    infoTitle,
    subDescription,
    catalogDetailImagesUrl,
    location,
    groupSize,
    duration,
    infoCategory,
    infoDetailsReceived,
    infosIds: infosIds || [],
  };
};

const DetailsInfoModalContainer = connect(
  mapStateToProps,
  null
)(DetailsInfoModal);

export default DetailsInfoModalContainer;
