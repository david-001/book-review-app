package com.example.bookreview.services;

import com.example.bookreview.exceptions.BadRequestException;
import com.example.bookreview.exceptions.ResourceNotFoundException;
import com.example.bookreview.models.UserAuthor;
import com.example.bookreview.repositories.UserAuthorRepository;
import com.example.bookreview.repositories.UserReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserAuthorServiceImpl implements UserAuthorService{

    @Autowired
    UserAuthorRepository userAuthorRepository;

    @Override
    public UserAuthor addAuthor(Integer userBookId, String bookTitle, String authorName) throws BadRequestException {
        int userAuthorId = userAuthorRepository.create(userBookId, bookTitle, authorName);
        return userAuthorRepository.findById(userAuthorId);
    }

    @Override
    public List<UserAuthor> fetchUserAuthors(Integer userId) {
        return userAuthorRepository.findAll(userId);
    }

    @Override
    public UserAuthor fetchAuthorByBookId(Integer userBookId) {
        return userAuthorRepository.findByUserBookId(userBookId);
    }

    @Override
    public void removeUserAuthor(Integer userAuthorId) throws ResourceNotFoundException {
        userAuthorRepository.removeById(userAuthorId);
    }
}
