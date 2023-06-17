
export default class Youtube {
  constructor(apiClient) {
    // 의존성 주입(DI)
    this.apiClient = apiClient;
  }

  async search(q) {
    return q ? this.#searctApi(q) : this.#popularApi();
  }

  /**
   * Youtube 클래스에서는 직접적으로 api통신을 하는게 아니라 YoutubeClient 또는 FakeYoutubeClient로부터 의존성을 주입받아서
   * search나 videos에 파라미터만 입력해서 사용한다.
   */
  async #searctApi(q) {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 25,
          type: "video",
          q: q,
        },
      })

      .then((res) => res.data.items.map((item) => ({...item, id: item.id.videoId})));
  }

  async relatedVideos(id) {
    return this.apiClient.search({
      params: {
        part: "snippet",
        maxResults: 25,
        type: "video",
        relatedToVideoId: id,
      },
    })
    .then((res) => res.data.items.map((item) => ({...item, id: item.id.videoId})));
  }

  async #popularApi() {
    return this.apiClient
      .videos({
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostPopular",
        },
      })
      .then((res) => res.data.items);
  }

  async channelImageURL(videoId) {
    return this.apiClient
      .channels({
        params: {
          part: "snippet",
          id: videoId,
        },
      })
      .then((res) => res.data.items[0].snippet.thumbnails.default.url);
  }
}
