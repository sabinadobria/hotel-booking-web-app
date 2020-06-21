package com.talk2amareswaran.projects.hotelapp.rest;

import com.talk2amareswaran.projects.hotelapp.AccessTokenMapper;
import com.talk2amareswaran.projects.hotelapp.model.ApiResponse;
import com.talk2amareswaran.projects.hotelapp.model.Booking;
import com.talk2amareswaran.projects.hotelapp.model.Hotel;
import com.talk2amareswaran.projects.hotelapp.model.SearchResults;
import com.talk2amareswaran.projects.hotelapp.service.HotelServiceDAO;
import com.talk2amareswaran.projects.hotelapp.util.HotelAppErrorCodes;
import com.talk2amareswaran.projects.hotelapp.util.HotelAppErrorMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MyBookingsController {

    Logger logger = LoggerFactory.getLogger(BookingController.class);


    @Autowired
    HotelServiceDAO hotelServiceDAO;

    @RequestMapping(value = "/search/hotels/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getHotelById(
            @PathVariable("id")String id) {
        List<Hotel> searchResultList = hotelServiceDAO.searchHotelById(id);
        if (searchResultList == null || searchResultList.isEmpty()) {
            return new ResponseEntity<>(new ApiResponse(HotelAppErrorCodes.NOT_FOUND, HotelAppErrorMessage.NOT_FOUND), HttpStatus.OK);
        }
        SearchResults searchResults = new SearchResults();
        searchResults.setSearchResults(searchResultList);
        return new ResponseEntity<>(searchResults, HttpStatus.OK);
    }

    @RequestMapping(value="/bookings", method=RequestMethod.GET)
    public ResponseEntity<Object> bookingHotel() {
        AccessTokenMapper accessTokenMapper = (AccessTokenMapper)
                ((OAuth2AuthenticationDetails) SecurityContextHolder.getContext().getAuthentication().getDetails()).getDecodedDetails();
        List<Booking> bookingList =  hotelServiceDAO.searchBookingByUserId(accessTokenMapper.getId());
        logger.info("Bookink list" + bookingList);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
