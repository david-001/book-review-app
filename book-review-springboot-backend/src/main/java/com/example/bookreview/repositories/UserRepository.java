package com.example.bookreview.repositories;

import com.example.bookreview.exceptions.AuthException;
import com.example.bookreview.models.User;

public interface UserRepository {
    //Create new users/ Register new users
    Integer create(String userName, String email, String password) throws AuthException;

    //Login
    User findByEmailAndPassword(String email, String password) throws AuthException;

    //Check if email already exists
    Integer getCountByEmail(String email);
    User findById(Integer userId);
}