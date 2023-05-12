package com.user.table.usermanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.user.table.usermanagement.entity.User;
import com.user.table.usermanagement.repository.UserRepository;

@SpringBootApplication
public class UsermanagementApplication implements CommandLineRunner{

	
	
	public static void main(String[] args) {
		SpringApplication.run(UsermanagementApplication.class, args);
	}

	@Autowired
	private UserRepository uRepository;
	
	@Override
	public void run(String... args) throws Exception {
		uRepository.save(new User("Carlos", "Robles", "carlos@gmail.com","https://blog.texasbar.com/files/2011/12/housto-bankruptcy-attorney-adam-schachter1.jpg"));
		uRepository.save(new User("John", "Smith", "john@yahoo.com", "https://www.charmcityheadshots.com/static/images/cc-headshots-portfolio-0008.JPG"));
		uRepository.save(new User("Jane", "Doe", "jane@aol.com", "https://www.cityheadshots.com/uploads/5/1/2/1/5121840/editor/lowres-mjb-5074_3.jpg?1574008349"));
	}
}
