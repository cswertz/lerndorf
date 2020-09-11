import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditForm from '../../components/learningUnits/EditForm';

class LearningUnitsEdit extends Component {
  constructor(props) {
    super(props);

    this.addRelation = this.addRelation.bind(this);
    this.editTitle = this.editTitle.bind(this);
    this.setTarget = this.setTarget.bind(this);
    this.addTag = this.addTag.bind(this);

    this.state = {
      target: null,
    };
  }

  componentDidMount() {
    this.fetchItem();
  }

  componentDidUpdate() {
    this.fetchItem();
  }

  setTarget(target) {
    this.setState({
      target,
    });
  }

  fetchItem() {
    const {
      itemFetch,
      taxonomies,
      taxonomiesFetch,
      match,
      items,
    } = this.props;

    const {
      id,
    } = match.params;

    if ((!items.fetching) && !items.id[id]) {
      itemFetch(id);
    }

    if (!taxonomies.fetched && !taxonomies.fetching) {
      taxonomiesFetch();
    }
  }

  addTag(e) {
    e.preventDefault();

    const {
      learningUnitsAddTag,
      history,
      match,
      items,
    } = this.props;
    const {
      id,
      languageId,
    } = match.params;
    const tag = e.target.tag.value;
    const learningUnitId = id;
    const learningUnitLanguageId = items.id[id][languageId].item.id;

    learningUnitsAddTag(learningUnitLanguageId, tag, languageId, learningUnitId, history);
  }

  addRelation(e) {
    e.preventDefault();

    const {
      learningUnitsAddRelation,
      history,
      match,
    } = this.props;
    const {
      id,
      languageId,
    } = match.params;
    const { target } = this.state;
    const type = e.target.type.value;
    const learningUnitId = id;

    learningUnitsAddRelation(learningUnitId, target, type, languageId, history);
  }

  editTitle(e) {
    e.preventDefault();

    const {
      learningUnitsEdit,
      history,
      match,
    } = this.props;
    const {
      id,
      languageId,
    } = match.params;
    const learningUnitId = id;
    const data = {};
    data[languageId] = {
      title: e.target.title.value
    }

    learningUnitsEdit(learningUnitId, languageId, data, history);
  }

  render() {
    const {
      fetchSuggestions,
      suggestions,
      taxonomies,
      errors,
      items,
      match,
    } = this.props;
    const {
      id,
      languageId,
    } = match.params;

    if(items.id[id]) {
      const title = items.id[id][languageId].title;
      const initialValues = {
        title,
      };

      return (
        <EditForm
          fetchSuggestions={fetchSuggestions}
          addRelation={this.addRelation}
          editTitle={this.editTitle}
          suggestions={suggestions}
          taxonomies={taxonomies}
          setTarget={this.setTarget}
          addTag={this.addTag}
          errors={errors.add}
          initialValues={initialValues}
        />
      );
    }

    return null;
  }
}

LearningUnitsEdit.propTypes = {
  fetchSuggestions: PropTypes.func.isRequired,
  learningUnitsAddRelation: PropTypes.func.isRequired,
  taxonomiesFetch: PropTypes.func.isRequired,
  taxonomies: PropTypes.shape({}).isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  learningUnitsAddTag: PropTypes.func.isRequired,
  learningUnitsEdit: PropTypes.func.isRequired,
  items: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  itemFetch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      languageId: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const LearningUnitsEditWithRouter = withRouter(LearningUnitsEdit);

export default LearningUnitsEditWithRouter;
