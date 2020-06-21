package com.talk2amareswaran.projects.hotelapp.service;

import java.util.List;

import com.talk2amareswaran.projects.hotelapp.model.Booking;
import org.springframework.transaction.annotation.Transactional;

import com.talk2amareswaran.projects.hotelapp.model.Category;
import com.talk2amareswaran.projects.hotelapp.model.Hotel;

@Transactional
public interface HotelServiceDAO {

	public Category getCategories();

	public void deleteBooking(String id);
	public void updateBooking(String id, String rooms, String date);

	public List<String> searchTerm(String term);

	public List<Booking> searchBookingByUserId(String id);

	public List<Hotel> searchHotels(String term, int offset, int limit, String sortcolumn, String sorttype);

	public int getCount(String term);

	public List<Hotel> categorySearch(String categorylist, int offset, int limit, String sortcolumn, String sorttype);

	int getCategoryCount(String categorylist);

	public List<Hotel> searchHotelById(String id);

	public void creteBooking(String rooms, String id, String date, String user_id);

	public void createUser(String fname, String lname, String emailTxt, String pwd);

}
