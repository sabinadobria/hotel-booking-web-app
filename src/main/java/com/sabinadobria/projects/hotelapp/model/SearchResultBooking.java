package com.sabinadobria.projects.hotelapp.model;

import java.util.ArrayList;
import java.util.List;

public class SearchResultBooking {
    private List<Booking> searchResults = new ArrayList<>();
    private int totalCount;

    public List<Booking> getSearchResults() {
        return searchResults;
    }

    public void setSearchResults(List<Booking> searchResults) {
        this.searchResults = searchResults;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

}
