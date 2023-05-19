import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

import EditForm from '@components/knowledgeUnits/EditForm';

class KnowledgeUnitsEdit extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { taxonomiesFetch, taxonomies } = this.props;

    if (!taxonomies.fetched && !taxonomies.fetching) {
      taxonomiesFetch();
    }

    this.fetchItem();
  }

  componentDidUpdate() {
    this.fetchItem();
  }

  handleSubmit(e) {
    e.preventDefault();

    const { history, handleSubmit, match } = this.props;

    const { id } = match.params;

    const data = {
      objective: e.target.objective.value,
      comment: e.target.comment.value,
      time: e.target.time.value,
      recommendedAge: e.target.recommendedAge.value,
      publish: e.target.publish.checked,
      visiblePublic: e.target.visiblePublic.checked,
      visibleLexicon: e.target.visibleLexicon.checked,
      visibleCourses: e.target.visibleCourses.checked,
      suitableBlind: e.target.suitableBlind.checked,
      suitableDeaf: e.target.suitableDeaf.checked,
      suitableDumb: e.target.suitableDumb.checked,
      minimumScreenResolution: e.target.minimumScreenResolution.value,
      knowledgeType: e.target.knowledgeType.value,
      courseLevel: e.target.courseLevel.value,
      mediaType: e.target.mediaType.value,
      license: e.target.license.value,
      eqfLevel: e.target.eqfLevel.value,
    };

    data.minimumScreenResolution =
      data.minimumScreenResolution.isInteger !== '' ? data.minimumScreenResolution : null;
    data.knowledgeType = data.knowledgeType !== '' ? data.knowledgeType : null;
    data.courseLevel = data.courseLevel.isInteger !== '' ? data.courseLevel : null;
    data.mediaType = data.mediaType.isInteger !== '' ? data.mediaType : null;
    data.license = data.license.isInteger !== '' ? data.license : null;
    data.eqfLevel = data.eqfLevel.isInteger !== '' ? data.eqfLevel : null;

    handleSubmit(id, data, history);
  }

  fetchItem() {
    const { match, items, itemFetch } = this.props;

    const { id } = match.params;

    if (!items.id[id] && items.fetchingId !== id) {
      itemFetch(id);
    }
  }

  render() {
    const { taxonomies, errors, match, items } = this.props;

    const { id } = match.params;
    const item = items.id[id];
    if (!item) return null;

    item.courseLevel = item.cl ? item.cl.id : 82;
    item.knowledgeType = item.kt ? item.kt.id : null;
    item.license = item.l ? item.l.id : null;
    item.mediaType = item.mt ? item.mt.id : null;
    item.minimumScreenResolution = item.msr ? item.msr.id : 88;
    item.eqfLevel = item.el ? item.el.id : null;

    return (
      <div>
        <Typography variant="h5">Edit Knowledge Unit</Typography>
        <EditForm
          handleSubmit={this.handleSubmit}
          taxonomies={taxonomies.items}
          initialValues={item}
          errors={errors.add}
        />
      </div>
    );
  }
}

KnowledgeUnitsEdit.propTypes = {
  taxonomiesFetch: PropTypes.func.isRequired,
  taxonomies: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  itemFetch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  items: PropTypes.shape({
    id: PropTypes.shape({}).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetchingId: PropTypes.string,
  }).isRequired,
};

const KnowledgeUnitsEditWithRouter = withRouter(KnowledgeUnitsEdit);

export default KnowledgeUnitsEditWithRouter;
