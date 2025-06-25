import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    setLoading(true);

    const url = `https://gnews.io/api/v4/top-headlines?lang=en&country=${props.country}&topic=${props.category}&max=${props.pageSize}&apikey=5f1f35cac285eab9006e1a6395028170`;

    try {
      props.setProgress(30);
      const res = await fetch(url);
      props.setProgress(60);
      const data = await res.json();
      props.setProgress(80);
      setArticles(data.articles || []);
      setTotalResults(data.totalArticles || 0);
      setLoading(false);
      props.setProgress(100);
    } catch (err) {
      console.error("Error fetching news:", err);
      setLoading(false);
      props.setProgress(100);
    }
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const nextPage = page + 1;

    const url = `https://gnews.io/api/v4/top-headlines?lang=en&country=${props.country}&topic=${props.category}&max=${props.pageSize}&page=${nextPage}&apikey=5f1f35cac285eab9006e1a6395028170`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.articles) {
        setArticles((prev) => [...prev, ...data.articles]);
        setTotalResults(data.totalArticles || 0);
        setPage(nextPage);
      }
    } catch (err) {
      console.error("Error loading more data:", err);
    }
  };

  return (
    <>
      <h2
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        PrimeBulletin - Top {capitalizeFirstLetter(props.category)} Headlines
      </h2>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title || ""}
                  description={element.description || ""}
                  imageUrl={element.image}
                  newsUrl={element.url}
                  author={element.source?.name || "Unknown"}
                  date={element.publishedAt}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general", // must be: world, nation, business, technology, entertainment, sports, science, health
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
