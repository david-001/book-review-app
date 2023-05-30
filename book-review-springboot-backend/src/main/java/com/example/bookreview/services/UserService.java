package com.example.bookreview.services;

import com.example.bookreview.exceptions.AuthException;
import com.example.bookreview.models.User;

public interface UserService {
    User validateUser(String email, String password) throws AuthException;
    User registerUser(String userName, String email, String password) throws AuthException;
}
