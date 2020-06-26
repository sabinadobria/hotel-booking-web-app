package com.sabinadobria.projects.hotelapp.rest;

import com.sabinadobria.projects.hotelapp.model.ApiResponse;
import com.sabinadobria.projects.hotelapp.model.Category;
import com.sabinadobria.projects.hotelapp.service.HotelServiceDAO;
import com.sabinadobria.projects.hotelapp.util.HotelAppErrorMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sabinadobria.projects.hotelapp.util.HotelAppErrorCodes;

@RestController
public class CategoriesController {

	@Autowired
    HotelServiceDAO hotelServiceDAO;

	@RequestMapping(value = "/categories", method = RequestMethod.GET)
	public ResponseEntity<Object> getCategories() {
		Category category = hotelServiceDAO.getCategories();
		if (category == null || category.getCategories().isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(HotelAppErrorCodes.NOT_FOUND, HotelAppErrorMessage.NOT_FOUND), HttpStatus.OK);
		}
		return new ResponseEntity<>(category, HttpStatus.OK);
	}
}
