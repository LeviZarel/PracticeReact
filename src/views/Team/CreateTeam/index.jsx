import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from './actions';
import TeamForm from '../components/TeamForm';
import ActionForm from '../../../components/ActionForm';
import Navbar from '../../Navbar';
import './CreateTeam.css';

class CreateTeam extends Component {
  render() {
    const {people, formCreate} = this.props;
    const actions = [
      {
        text: 'Register',
        onClick: this.onClickButtonCreateTeam,
        type: 'primary',
        isLoading: false,
        icon: 'add_circle'
      },
      {
        text: 'Cancel',
        onClick: this.onClickButtonCancel,
        type: 'secondary',
        isLoading: false,
        icon: 'cancel'
      }
    ];

    return (
      <div className="CreateTeam">
        <Navbar></Navbar>
        <ActionForm title={'Create Team'} actions={actions} >
          <TeamForm people={people} activeMembers={formCreate.members} onPeopleChange={this.handlePeople} onChangeNameTeam={this.changeNameTeam} value={formCreate.nameTeamValue}>
          </TeamForm>
        </ActionForm>
      </div>
    );
  }

  handlePeople = (id) => {
    this.props.updatePeople(id);
  }

  onClickButtonCreateTeam = () => {
    this.props.addTeam();
  }

  onClickButtonCancel = () => {
    this.props.restoreForm();
  }

  changeNameTeam = (value) => {
    this.props.updateForm({
      nameTeamValue: value
    });
  }
}

const mapStatesToProps = (state) => {
  return {
		people: state.createTeam.people,
		formCreate: state.createTeam.formCreate,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
		addTeam: () => dispatch(actions.ADD_TEAM()),
		restoreForm: () => dispatch(actions.RESTORE_FORM()),
		/* updateTask: payload => dispatch(actions.UPDATE_TASK(payload)),
    clearForm: () => dispatch(actions.CLEAR_FORM()), */
    updatePeople: (payload) => dispatch(actions.UPDATE_PEOPLE(payload)),
		updateForm: (payload) => dispatch(actions.UPDATE_FORM(payload))
  }
}

export default connect(mapStatesToProps, mapDispatchToProps)(CreateTeam);
