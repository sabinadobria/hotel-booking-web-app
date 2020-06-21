package com.talk2amareswaran.projects.hotelapp.rest;

import com.talk2amareswaran.projects.hotelapp.AccessTokenMapper;
import com.talk2amareswaran.projects.hotelapp.model.*;
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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MyBookingsController {

    Logger logger = LoggerFactory.getLogger(BookingController.class);


    @Autowired
    HotelServiceDAO hotelServiceDAO;

    @RequestMapping(value="/bookings", method=RequestMethod.GET)
    public ResponseEntity<Object> bookingHotel() {
        AccessTokenMapper accessTokenMapper = (AccessTokenMapper)
                ((OAuth2AuthenticationDetails) SecurityContextHolder.getContext().getAuthentication().getDetails()).getDecodedDetails();
        List<Booking> searchResultList =  hotelServiceDAO.searchBookingByUserId(accessTokenMapper.getId());
        if (searchResultList == null || searchResultList.isEmpty()) {
            return new ResponseEntity<>(new ApiResponse(HotelAppErrorCodes.NOT_FOUND, HotelAppErrorMessage.NOT_FOUND), HttpStatus.OK);
        }
        SearchResultBooking searchResults = new SearchResultBooking();
        logger.info("searchResults list", searchResultList);
        searchResults.setSearchResults(searchResultList);
        logger.info("searchResult", searchResults);
        return new ResponseEntity<>(searchResults, HttpStatus.OK);
    }

    @RequestMapping(value="/bookings/delete/{id}", method=RequestMethod.DELETE)
    public ResponseEntity<Object> bookingHotel(@PathVariable("id")String id) {
        hotelServiceDAO.deleteBooking(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value="/bookings/manage", method=RequestMethod.POST)

    public ResponseEntity<Object> manageBooking(@RequestParam(required = true, name = "id", defaultValue = "") String id,
                                                @RequestParam(required = true, name = "rooms", defaultValue = "") String rooms,
                                                @RequestParam(required = true, name = "date", defaultValue = "") String date) {
        hotelServiceDAO.updateBooking(id, rooms, date);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
