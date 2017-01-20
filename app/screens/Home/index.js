import React, {Component} from 'react';
import './assets/style.css';
import {browserHistory} from 'react-router'

export default class Home extends Component {
    constructor(){
        super();
        console.log("где конструктор блеать");
        var auth = false;
        if(!auth){
            console.log("LOOOL SUKA");
            browserHistory.push({pathname: '/login'});
        }
    };
    handleSubmit = (e) => {
        e.preventDefault();
        // this.context.router.push({pathname: '/login'});
        console.log(this._input);
        this.context.router.push({pathname: `/user/${this._input.value}`});
    };

    render() {
        return (
            <section className="container home">
                <form
                    className="form-inline"
                    role="form"
                    onSubmit={this.handleSubmit}
                >
                    <div className="form-group">
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Enter a GitHub user..."
                                className="form-control"
                                ref={ref => (this._input = ref)}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Go
                    </button>
                </form>
            </section>
        );
    }
}

Home.contextTypes = {
    router: React.PropTypes.object.isRequired,
};
