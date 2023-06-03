package com.exam.examserver.repo;

import com.exam.examserver.entity.Organization;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
class OrganizationRepositoryTest {

    @Autowired
    private OrganizationRepository organizationRepository;

    @Test
    void existsByOrgName() {
        Organization organization = new Organization("Test", "Test Organization");
        organizationRepository.save(organization);

        Boolean isExists = organizationRepository.existsByOrgName(organization.getOrgName());
        assertThat(isExists).isTrue();
    }
}