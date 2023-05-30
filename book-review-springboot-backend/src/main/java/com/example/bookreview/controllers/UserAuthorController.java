package com.example.bookreview.controllers;

import com.example.bookreview.models.UserAuthor;
import com.example.bookreview.models.UserReview;
import com.example.bookreview.services.UserAuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/userauthors")
public class UserAuthorController {

    @Autowired
    UserAuthorService userAuthorService;

    @PostMapping("/add")
    public ResponseEntity<UserAuthor> addUserAuthor(@RequestBody Map<String, Object> userAuthorMap){
        Integer userBookId = (Integer) userAuthorMap.get("userBookId");
        String bookTitle = (String) userAuthorMap.get("bookTitle");
        String authorName = (String) userAuthorMap.get("authorName");
        UserAuthor userAuthor = userAuthorService.addAuthor(userBookId,bookTitle,authorName);
        return new ResponseEntity<>(userAuthor, HttpStatus.OK);

    }

    @GetMapping("")
    public ResponseEntity<List<UserAuthor>> getAllUserAuthors(HttpServletRequest request){
        int userId = (Integer) request.getAttribute("userId");
        List<UserAuthor> userAuthors = userAuthorService.fetchUserAuthors(userId);
        return new ResponseEntity<>(userAuthors, HttpStatus.OK);
    }

    @GetMapping("/{userBookId}")
    public ResponseEntity<UserAuthor> getAuthorByBookId(@PathVariable("userBookId") Integer userBookId){
        UserAuthor userAuthor = userAuthorService.fetchAuthorByBookId(userBookId);
        return new ResponseEntity<>(userAuthor, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{userAuthorId}")
    public ResponseEntity<Map<String,Boolean>> deleteUserReview(@PathVariable("userAuthorId") Integer userAuthorId){
        userAuthorService.removeUserAuthor(userAuthorId);
        Map<String, Boolean> map = new HashMap<>();
        map.put("success",true);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

}
