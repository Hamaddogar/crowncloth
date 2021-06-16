import React, { Component, Fragment } from 'react';
import './ShopPage.scss';
import PreviewCollection from '../components/PreviewCollection';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { fetchCollectionsAsync } from '../actions/updateCollectionsAction'

class ShopPage extends Component {
    render() {
        const { collectionsReducer } = this.props;
        return (
            <Fragment>
                {collectionsReducer.length > 0 ? <div className='ShopPage'>
                    <h1>Collections</h1>

                    <Switch>
                        {collectionsReducer.map(collection => {
                            return (
                                <Route key={collection.id}
                                    path={`/shop/${collection.routeName}`}
                                    component={() => <PreviewCollection collection={collection} />}
                                />
                            )
                        })}
                        <Route path='/shop' component={() => collectionsReducer.map((collection => <PreviewCollection collection={collection} key={collection.id} />))} />
                    </Switch>
                </div> : <div className='blur'><div className="lds-ring"><div></div><div></div><div></div></div></div>}
            </Fragment>
        )
    }
    shouldComponentUpdate({ collectionsReducer }) {
        if (collectionsReducer.length > 0 && collectionsReducer !== this.props.collectionsReducer) {
            return true;
        }
        return false;
    }
    componentDidMount(){
        this.props.fetchCollectionsAsync();
    }
}

const mapStateToProps = ({ collectionsReducer }) => (
    { collectionsReducer: collectionsReducer }
)
const mapDispatchToProps = dispatch => ({
    fetchCollectionsAsync: collections => dispatch(fetchCollectionsAsync(collections))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);