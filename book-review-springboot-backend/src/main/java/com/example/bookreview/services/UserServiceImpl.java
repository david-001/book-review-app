package com.example.bookreview.services;

import com.example.bookreview.exceptions.AuthException;
import com.example.bookreview.models.User;
import com.example.bookreview.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.regex.Pattern;

@Service
@Transactional
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Override
    public User validateUser(String email, String password) throws AuthException {
        if(email!=null) email = email.toLowerCase();
        return userRepository.findByEmailAndPassword(email,password);
    }

    @Override
    public User registerUser(String userName, String email, String password) throws AuthException {
        Pattern pattern = Pattern.compile("^(.+)@(.+)$");
        if(email != null) email = email.toLowerCase();
        if(!pattern.matcher(email).matches())
            throw new AuthException("Invalid email");
        Integer count = userRepository.getCountByEmail(email);
        if(count>0)
            throw new AuthException("Email already in use");
        Integer userId = userRepository.create(userName, email, password);
        return userRepository.findById(userId);
    }
}
