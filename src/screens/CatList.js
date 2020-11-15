import React from 'react';
import axios from 'axios';
import {
  Container,
  Form,
} from 'react-bootstrap';
import CatLoading from '../assets/cats.gif';
import InfiniteScroll from 'react-infinite-scroller';
import JumbotronComponent from '../components/JumbotronComponent';
import CatItems from '../components/CatItems';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = 'DEMO-API-KEY';

class CatList extends React.Component {
  state = {
    isLoading: true,
    cats: [],
    page: 0,
    limit: 10,
    search: '',
    isMax: false,
    isLoadingLoad: false,
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const { limit, page, cats } = this.state;
    const url = `/breeds?limit=${limit}&page=${page}`;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        let result = res.data;
        this.setState({
          cats: cats.concat(result),
          page: page + 1,
          isMax: result.length === 0,
          isLoading: false,
          isLoadingLoad: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  searchData = () => {
    axios.get(`/breeds/search?q=${this.state.search}`).then((res) => {
      console.log('search', res.data);
      let result = res.data;
      this.setState({ cats: result });
    });
  };

  handleInputChange = () => {
    this.setState(
      {
        search: this.search.value,
        isLoadingLoad: true,
        page: 0,
      },
      () => {
        if (this.state.search && this.state.search.length > 0) {
          this.searchData();
        } else {
          this.loadData();
        }
      }
    );
  };

  render() {
    const { cats, isMax, isLoading, isLoadingLoad } = this.state;
    return (
      <Container>
        <JumbotronComponent />
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Control
            type="search"
            placeholder='Search for...'
            ref={(input) => (this.search = input)}
            onChange={this.handleInputChange}
          />
        </Form>
        <hr />
        {cats.length === 0 && !isLoading ? (
          'Maaf, Data yang anda cari belum tersedia'
        ) : (
            <InfiniteScroll
              initialLoad={false}
              loadMore={!isMax ? this.loadData : null}
              hasMore={!isMax}
              loader={!isLoadingLoad && !isLoading ? <img src={CatLoading} alt="loading" />
                : ''}
            >
              {isLoading ? (
                <img src={CatLoading} alt="loading" />
              ) : (
                  <>
                    {this.state.cats.map((cats) => (
                      <div key={cats.id}>
                        <CatItems cats={cats} />
                      </div>
                    ))}
                  </>
                )}
            </InfiniteScroll>
          )}
      </Container>
    );
  }
}

export default CatList;
