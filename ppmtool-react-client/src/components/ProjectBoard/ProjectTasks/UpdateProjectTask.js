import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import classnames from "classnames";

import { getProjectTask } from "../../../actions/backlogActions";

class UpdateProjectTask extends Component {

    constructor() {
        super();
        this.state = {
            id: "",
            projectSequence: "",
            summary: "",
            acceptanceCriteria: "",
            status: "",
            priority: 0,
            dueDate: null,
            projectIdentifier: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        const { id, projectSequence, summary, acceptanceCriteria, status, priority, dueDate, projectIdentifier } = nextProps.project;
        this.setState({
            id,
            projectSequence,
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier
        });
    }
    componentDidMount() {
        const { backlog_id, id } = this.props.match.params;
        this.props.getProjectTask(backlog_id, id, this.props.history);
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const newProject = {
            id: this.state.id,
            projectSequence: this.state.projectSequence,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate,
            projectIdentifier: this.state.projectIdentifier
        };
        this.props.createProject(newProject, this.props.history);
    }
    render() {
        return (
            <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            {/* <Link to={`/projectBoard/`} className="btn btn-light">
                        Back to Project Board
                        </Link> */}
                            <h4 className="display-4 text-center">Add /Update Project Task</h4>
                            <p className="lead text-center">Project Name + Project Code</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text"
                                        className={classnames("form-control form-control-lg",
                                            { "is-invalid": errors.summary }
                                        )}
                                        name="summary"
                                        placeholder="Project Task summary"
                                    />
                                    {errors && (
                                        <div className="invalid-feedback">{errors.summary}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control form-control-lg" placeholder="Acceptance Criteria" name="acceptanceCriteria"></textarea>
                                </div>
                                <h6>Due Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="dueDate" />
                                </div>
                                <div className="form-group">
                                    <select className="form-control form-control-lg" name="priority">
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <select className="form-control form-control-lg" name="status">
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>

                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

UpdateProjectTask.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project: state.backlog.project_task
});

export default connect(
    mapStateToProps,
    { getProjectTask }
)(UpdateProjectTask);